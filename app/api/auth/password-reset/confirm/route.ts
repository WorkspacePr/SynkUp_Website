import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/http";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const uid = String(body?.uid ?? "").trim();
        const token = String(body?.token ?? "").trim();
        const new_password = String(body?.new_password ?? "");

        if (!uid || !token || !new_password) {
            return NextResponse.json(
                { message: "uid, token and new_password are required" },
                { status: 400 }
            );
        }

        if (new_password.length < 8) {
            return NextResponse.json(
                { message: "Password must be at least 8 characters" },
                { status: 400 }
            );
        }

        await apiFetch("/api/auth/password-reset/confirm/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid, token, new_password }),
        });

        return NextResponse.json({ message: "Password updated. You can now log in." });

    } catch (err: any) {
        const status = Number(err?.status) || 500;

        let message = "Could not reset password";
        let errors = err?.data || null;

        if (err?.data) {
            if (err.data.error) {
                message = err.data.error;
            } else if (err.data.non_field_errors && Array.isArray(err.data.non_field_errors)) {
                message = err.data.non_field_errors[0];
            } else if (err.data.token && Array.isArray(err.data.token)) {
                // Handle "invalid/expired token" errors
                message = err.data.token[0];
            } else if (err.data.new_password && Array.isArray(err.data.new_password)) {
                // Handle password validation errors from backend
                message = err.data.new_password[0];
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

        console.error("PASSWORD_RESET_CONFIRM_ERROR:", {
            status,
            message,
            rawError: err?.data
        });

        return NextResponse.json({ message, errors }, { status });
    }
}