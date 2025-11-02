import { NextResponse } from "next/server";
import { apiFetch, toFormBody } from "@/lib/http";

export async function POST(req: Request) {
    try {
        const body = await req.json(); // { user_id, code }
        const user_id = Number(body?.user_id ?? 0);
        const code = String(body?.code ?? "").trim();

        const rememberRaw = body?.remember;
        const remember =
            rememberRaw === true ||
            rememberRaw === "true" ||
            rememberRaw === 1 ||
            rememberRaw === "1";

        if (!user_id || !code)
            return NextResponse.json({ message: "user_id and code are required" }, { status: 400 });

        // Be flexible with backend expectations
        const payload: Record<string, any> = {
            user_id, code,
            remember, otp: code, otp_code: code
        };

        let data: { token: string; user: any };
        try {
            data = await apiFetch("/api/auth/login/verify-otp/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        } catch (e: any) {
            // Retry as form-encoded if backend rejects JSON
            if (Number(e?.status) === 400) {
                data = await apiFetch("/api/auth/login/verify-otp/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: toFormBody(payload),
                });
            } else {
                throw e;
            }
        }

        const isProd = process.env.NODE_ENV === "production";
        const res = NextResponse.json({ ok: true, user: data.user });
        res.cookies.set("auth_token", data.token, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/",
            ...(remember ? { maxAge: 60 * 60 * 24 * 30 } : {}),
        });
        return res;
    } catch (err: any) {
        const status = Number(err?.status) || 500;
        const message =
            err?.data?.message ||
            err?.data?.detail ||
            (typeof err?.data?.__raw === "string" ? err.data.__raw : err?.message) ||
            "Verification failed";
        console.error("VERIFY_OTP_PROXY_ERROR:", { status, message, data: err?.data });
        return NextResponse.json({ message }, { status });
    }
}
