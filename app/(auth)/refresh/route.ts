import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/http";

export async function POST(req: Request) {
    try {
        const refreshToken = req.headers.get('cookie')
            ?.split('; ')
            .find(c => c.startsWith('refresh_token='))
            ?.split('=')[1];

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

        res.cookies.set("auth_token", data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
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