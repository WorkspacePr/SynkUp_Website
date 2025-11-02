import { NextResponse } from "next/server";
import { apiFetch, toFormBody } from "@/lib/http";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const uid = String(body?.uid ?? "").trim();
        const token = String(body?.token ?? "").trim();
        const new_password = String(body?.new_password ?? "");

        if (!uid || !token || !new_password) {
            return NextResponse.json({ message: "uid, token and new_password are required" }, { status: 400 });
        }

        // Basic client-side style validation can happen in the page; keep server strict too
        if (new_password.length < 8) {
            return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
        }

        // Try JSON, then form-encoded
        try {
            await apiFetch("/api/auth/password-reset/confirm/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, token, new_password }),
            });
        } catch (e: any) {
            if (Number(e?.status) === 400) {
                await apiFetch("/api/auth/password-reset/confirm/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: toFormBody({ uid, token, new_password }),
                });
            } else {
                throw e;
            }
        }

        return NextResponse.json({ message: "Password updated. You can now log in." });
    } catch (err: any) {
        const status = Number(err?.status) || 500;
        const message =
            err?.data?.message || err?.data?.detail || err?.message || "Could not reset password";
        return NextResponse.json({ message }, { status });
    }
}
