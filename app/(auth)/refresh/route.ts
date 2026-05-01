import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/http";

const ONE_DAY_SECONDS = 60 * 60 * 24;
const TWENTY_ONE_DAYS_SECONDS = ONE_DAY_SECONDS * 21;

export async function POST(req: Request) {
    try {
        const cookieHeader = req.headers.get('cookie') ?? "";
        const cookieParts = cookieHeader.split('; ');
        const refreshToken = cookieParts
            .find(c => c.startsWith('refresh_token='))
            ?.split('=')[1];
        const rememberCookie = cookieParts
            .find(c => c.startsWith('remember_me='))
            ?.split('=')[1];
        const remember = rememberCookie === "1" || rememberCookie === "true";

        if (!refreshToken) {
            return NextResponse.json(
                { message: "No refresh token" },
                { status: 401 }
            );
        }

        const data = await apiFetch<{ access: string }>("/api/auth/refresh/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        const res = NextResponse.json({ ok: true });
        const authCookieMaxAge = remember ? TWENTY_ONE_DAYS_SECONDS : ONE_DAY_SECONDS;

        res.cookies.set("auth_token", data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: authCookieMaxAge,
        });

        return res;
    } catch (err: any) {
        console.error("TOKEN_REFRESH_ERROR:", err);
        return NextResponse.json(
            { message: "Failed to refresh token" },
            { status: 401 }
        );
    }
}
