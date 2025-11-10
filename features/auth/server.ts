import { cookies } from "next/headers";
import { apiFetch } from "@/lib/http";

export async function getServerUser() {
  const at = (await cookies()).get("access_token")?.value;
  if (!at) return null;
  try {
    const me = await apiFetch("/api/me/", { headers: { Authorization: `Bearer ${at}` } });
    return me;
  } catch {
    return null;
  }
}