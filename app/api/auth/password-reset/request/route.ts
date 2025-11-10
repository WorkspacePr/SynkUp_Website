import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/http";

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const email = String(body?.email ?? "").trim();

        if (!email) {
            // Still return 200 to prevent user enumeration
            return NextResponse.json({
                message: "If that email exists, we've sent instructions."
            });
        }

        try {
            await apiFetch("/api/auth/password-reset/request/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
        } catch (e: any) {
            // Log the actual error for debugging, but don't expose it
            console.error("PASSWORD_RESET_REQUEST_ERROR:", {
                status: e?.status,
                error: e?.data
            });

            // Don't leak details—still return a generic success
            // This prevents user enumeration attacks
        }

        return NextResponse.json({
            message: "If that email exists, we've sent instructions."
        });

    } catch (err: any) {
        // Log unexpected errors for debugging
        console.error("PASSWORD_RESET_REQUEST_UNEXPECTED_ERROR:", err);

        // Always a generic success to avoid enumeration
        return NextResponse.json({
            message: "If that email exists, we've sent instructions."
        });
    }
}