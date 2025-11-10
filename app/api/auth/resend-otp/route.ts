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

        let body: any;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json(
                { message: "Invalid JSON body" },
                { status: 400 }
            );
        }

        const user_id = Number(body?.user_id ?? 0);
        if (!user_id) {
            return NextResponse.json(
                { message: "user_id is required" },
                { status: 400 }
            );
        }

        const out = await apiFetch<{ message?: string }>(
            "/api/auth/resend-otp/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id }),
            }
        );

        const message = out?.message ?? "OTP resent successfully";
        return NextResponse.json({ ok: true, message });

    } catch (err: any) {
        const status = Number(err?.status) || 500;

        let message = "Could not resend code";
        let errors = err?.data || null;

        if (err?.data) {
            if (err.data.error) {
                // Your backend uses {"error": "..."}
                message = err.data.error;
            } else if (err.data.non_field_errors && Array.isArray(err.data.non_field_errors)) {
                message = err.data.non_field_errors[0];
            } else if (err.data.user_id && Array.isArray(err.data.user_id)) {
                message = err.data.user_id[0];
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

        console.error("RESEND_OTP_ERROR:", {
            status,
            message,
            rawError: err?.data
        });

        return NextResponse.json({ message, errors }, { status });
    }
}