import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/http";

export async function GET(req: Request) {
  try {
    const token = req.headers
      .get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const data = await apiFetch("/api/auth/profile/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(data);
  } catch (err: unknown) {
    const error = err as {
      status?: number;
      data?: { error?: string; detail?: string; message?: string };
    };
    const status = Number(error?.status) || 500;
    const message =
      error?.data?.error ||
      error?.data?.detail ||
      error?.data?.message ||
      "Failed to fetch profile";

    return NextResponse.json({ message }, { status });
  }
}
