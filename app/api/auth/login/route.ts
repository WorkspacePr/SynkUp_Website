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
        try {
            body = await req.json();
        } catch {
            return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
        }

        const payload = {
            email: String(body?.email ?? "").trim(),
            password: String(body?.password ?? ""),
        };

        if (!payload.email || !payload.password) {
            return NextResponse.json(
                { message: "Email and password are required." },
                { status: 400 }
            );
        }

        // 2) Call Django API
        const out = await apiFetch<{ message: string; user_id: number }>(
            "/api/auth/login/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }
        );

        return NextResponse.json({ requires_otp: true, ...out });

    } catch (err: any) {
        const status = Number(err?.status) || 500;

        // Handle different error structures from Django
        let message = "Login failed";
        let errors = err?.data || null;

        if (err?.data) {
            // Django DRF often returns errors in these formats:
            if (err.data.non_field_errors && Array.isArray(err.data.non_field_errors)) {
                message = err.data.non_field_errors[0]; // "Invalid credentials"
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

        console.error("LOGIN_ERROR:", {
            status,
            message,
            rawError: err?.data
        });

        return NextResponse.json(
            {
                message,
                errors // Pass through the full error object for frontend handling
            },
            { status }
        );
    }
}