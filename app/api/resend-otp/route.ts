import { NextResponse } from "next/server";
import { apiFetch, toFormBody } from "@/lib/http";

export async function POST(req: Request) {
    try {
        if (!process.env.DJANGO_API_BASE) {
            return NextResponse.json(
                { message: "Server misconfigured: DJANGO_API_BASE is missing" },
                { status: 500 }
            );
        }

        // parse and validate
        let body: any;
        try { body = await req.json(); }
        catch { return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }); }

        const user_id = Number(body?.user_id ?? 0);
        if (!user_id) {
            return NextResponse.json({ message: "user_id is required" }, { status: 400 });
        }

        // Try JSON first
        let out: any = null;
        try {
            out = await apiFetch<{ message?: string }>(
                "/api/auth/resend-otp/",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user_id }),
                }
            );
        } catch (e: any) {
            // If DRF expects form-encoded (like your Postman), retry on 400
            if (Number(e?.status) === 400) {
                out = await apiFetch<{ message?: string }>(
                    "/api/auth/resend-otp/",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: toFormBody({ user_id }),
                    }
                );
            } else {
                throw e;
            }
        }

        // Some endpoints reply 204 No Content; normalize to JSON
        const message = out?.message ?? "OTP resent successfully";
        return NextResponse.json({ ok: true, message });
    } catch (err: any) {
        const status = Number(err?.status) || 500;
        const message =
            err?.data?.message ||
            err?.data?.detail ||
            err?.message ||
            "Could not resend code";
        // log for dev
        console.error("RESEND_OTP_PROXY_ERROR:", { status, message, data: err?.data });
        return NextResponse.json({ message }, { status });
    }
}
