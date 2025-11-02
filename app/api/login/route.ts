import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/http";

export async function POST(req: Request) {
    try {
        if (!process.env.DJANGO_API_BASE) {
            return NextResponse.json(
                { message: "Server misconfigured: DJANGO_API_BASE is missing" },
                { status: 500 }
            );
        }

        // 1) read body and trim
        let body: any;
        try { body = await req.json(); }
        catch { return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }); }

        const payload = {
            email: String(body?.email ?? "").trim(),
            password: String(body?.password ?? ""),
        };
        if (!payload.email || !payload.password) {
            return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
        }

        // 2) Try JSON first
        try {
            const out = await apiFetch<{ message: string; user_id: number }>(
                "/api/auth/login/",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
            return NextResponse.json({ requires_otp: true, ...out });
        } catch (e: any) {
            // 3) If Django said 400, retry as x-www-form-urlencoded (like Postman often does)
            if (Number(e?.status) === 400) {
                const formBody = new URLSearchParams(payload as any).toString();
                const out = await apiFetch<{ message: string; user_id: number }>(
                    "/api/auth/login/",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: formBody,
                    }
                );
                return NextResponse.json({ requires_otp: true, ...out });
            }
            throw e; // rethrow non-400
        }
    } catch (err: any) {
        const status = Number(err?.status) || 500;
        const backendMsg =
            err?.data?.message || err?.data?.detail || err?.message || "Login failed";
        // Log for dev visibility
        console.error("LOGIN_PROXY_ERROR:", { status, backendMsg, data: err?.data });
        return NextResponse.json(
            { message: backendMsg, errors: err?.data ?? null },
            { status }
        );
    }
}
