import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/http";

interface VerifyOTPResponse {
    message: string;
    tokens: {
        refresh: string;
        access: string;
    };
    user: any;
}
const ONE_DAY_SECONDS = 60 * 60 * 24;
const TWENTY_ONE_DAYS_SECONDS = ONE_DAY_SECONDS * 21;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const email = String(body?.email ?? "").trim();
        const code = String(body?.code ?? "").trim();

        const rememberRaw = body?.remember;
        const remember =
            rememberRaw === true ||
            rememberRaw === "true" ||
            rememberRaw === 1 ||
            rememberRaw === "1";

        if (!email || !code) {
            return NextResponse.json(
                { message: "email and code are required" },
                { status: 400 }
            );
        }


        const payload = {
            email,
            code,
            remember,
        };

        const data = await apiFetch<VerifyOTPResponse>(
            "/api/auth/login/verify-otp/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }
        );

        // Extract the access token from the tokens object
        const accessToken = data.tokens?.access;
        const refreshToken = data.tokens?.refresh;

        if (!accessToken) {
            console.error("ERROR: No access token in response!", data);
            return NextResponse.json(
                { message: "Authentication failed - no token received" },
                { status: 500 }
            );
        }

        console.log("Token received successfully:", accessToken, refreshToken);

        const isProd = process.env.NODE_ENV === "production";
        const res = NextResponse.json({ ok: true, user: data.user });

        // Set the access token cookie
        const authCookieMaxAge = remember ? TWENTY_ONE_DAYS_SECONDS : ONE_DAY_SECONDS;

        res.cookies.set("auth_token", accessToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/",
            maxAge: authCookieMaxAge,
        });

        // Store refresh token with the same duration as auth cookie.
        res.cookies.set("refresh_token", refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/",
            maxAge: authCookieMaxAge,
        });

        // Persist remember preference so refresh route can keep the same duration.
        res.cookies.set("remember_me", remember ? "1" : "0", {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/",
            maxAge: authCookieMaxAge,
        });

        return res;
    } catch (err: any) {
        const status = Number(err?.status) || 500;

        let message = "Verification failed";
        let errors = err?.data || null;

        if (err?.data) {
            // Check for different Django error formats
            if (err.data.error) {
                // Your backend uses {"error": "..."}
                message = err.data.error;
            } else if (err.data.non_field_errors && Array.isArray(err.data.non_field_errors)) {
                message = err.data.non_field_errors[0];
            } else if (err.data.code && Array.isArray(err.data.code)) {
                message = err.data.code[0];
            } else if (err.data.detail) {
                message = err.data.detail;
            } else if (err.data.message) {
                message = err.data.message;
            } else if (typeof err.data === 'string') {
                message = err.data;
            }
        } else if (err?.message) {
            message = err.message;
        }

        console.error("VERIFY_OTP_ERROR:", {
            status,
            message,
            rawError: err?.data
        });

        return NextResponse.json({ message, errors }, { status });
    }
}
