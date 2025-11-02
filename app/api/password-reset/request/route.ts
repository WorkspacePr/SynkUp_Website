import { NextResponse } from "next/server";
import { apiFetch, toFormBody } from "@/lib/http";

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const email = String(body?.email ?? "").trim();
        if (!email) {
            // Still return 200 to prevent user enumeration
            return NextResponse.json({ message: "If that email exists, we’ve sent instructions." });
        }

        // Try JSON first, fall back to form-encoded if DRF rejects JSON
        try {
            await apiFetch("/api/auth/password-reset/request/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
        } catch (e: any) {
            if (Number(e?.status) === 400) {
                await apiFetch("/api/auth/password-reset/request/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: toFormBody({ email }),
                });
            } else {
                // Don’t leak details—still return a generic success
                return NextResponse.json({ message: "If that email exists, we’ve sent instructions." });
            }
        }

        return NextResponse.json({ message: "If that email exists, we’ve sent instructions." });
    } catch {
        // Always a generic success to avoid enumeration
        return NextResponse.json({ message: "If that email exists, we’ve sent instructions." });
    }
}
