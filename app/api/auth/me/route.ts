import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/http";

export async function GET(req: Request) {
    try {
        const token = req.headers.get('cookie')
            ?.split('; ')
            .find(c => c.startsWith('auth_token='))
            ?.split('=')[1];

        if (!token) {
            return NextResponse.json(
                { message: "Not authenticated" }, 
                { status: 401 }
            );
        }

        // Use JWT Bearer token format (not Token)
        const user = await apiFetch("/api/auth/user/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,  // Changed from "Token" to "Bearer"
            },
        });

        return NextResponse.json({ user });
    } catch (err: any) {
        const status = Number(err?.status) || 500;
        
        let message = "Failed to fetch user";
        
        if (err?.data) {
            if (err.data.error) {
                message = err.data.error;
            } else if (err.data.detail) {
                message = err.data.detail;
            } else if (err.data.message) {
                message = err.data.message;
            }
        }

        console.error("FETCH_USER_ERROR:", { 
            status, 
            message, 
            rawError: err?.data 
        });
        
        return NextResponse.json({ message }, { status });
    }
}