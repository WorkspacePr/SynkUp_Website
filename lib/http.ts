export const API_BASE = process.env.DJANGO_API_BASE!;

type Json = Record<string, any>;

/** Extend RequestInit to allow a `json` field */
export type FetchInit = Omit<RequestInit, "body" | "headers"> & {
    json?: Json;
    headers?: Record<string, string>;
    body?: BodyInit | null;
};

export async function apiFetch<T = any>(
    path: string,
    init: FetchInit = {}
): Promise<T> {
    const { json, headers = {}, ...rest } = init;

    const res = await fetch(`${API_BASE}${path}`, {
        ...rest,
        cache: "no-store",
        headers: {
            "Content-Type": json ? "application/json" : headers["Content-Type"] ?? "application/json",
            ...headers,
        },
        body: json ? JSON.stringify(json) : init.body ?? null,
    });

    const text = await res.text();
    let data: any = {};
    try { data = text ? JSON.parse(text) : {}; } catch { data = { __raw: text }; }

    if (!res.ok) {
        const msg = data?.detail || data?.message || `HTTP ${res.status}`;
        throw Object.assign(new Error(msg), { status: res.status, data });
    }
    return data as T;
}

/** Optional: helper for x-www-form-urlencoded */
export function toFormBody(obj: Record<string, any>) {
    return new URLSearchParams(
        Object.entries(obj).map(([k, v]) => [k, String(v ?? "")])
    ).toString();
}
