import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const token = req.headers
      .get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("auth_token="))
      ?.split("=")[1];

    // Optionally call Django logout endpoint if it exists
    if (token) {
      try {
        await fetch(`${process.env.DJANGO_API_BASE}/api/auth/logout/`, {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      } catch (error) {
        // Ignore backend errors, still clear the cookie
        console.error("Backend logout error:", error);
      }
    }

    const res = NextResponse.json({ message: "Logged out successfully" });

    // Clear the auth token cookie
    res.cookies.set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // Expire immediately
    });

    return res;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
