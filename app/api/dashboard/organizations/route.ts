import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/http";

function getErrorMeta(err: unknown) {
    if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        "status" in err
    ) {
        const withMeta = err as {
            message?: string;
            status?: number;
            data?: unknown;
        };
        return {
            message: withMeta.message,
            status: withMeta.status,
            data: withMeta.data,
        };
    }

    if (err instanceof Error) {
        return { message: err.message, status: undefined };
    }

    return { message: undefined, status: undefined, data: undefined };
}

function flattenMessages(value: unknown, depth = 0): string[] {
    if (depth > 3 || value == null) {
        return [];
    }
    if (typeof value === "string") {
        return [value];
    }
    if (Array.isArray(value)) {
        return value.flatMap((item) => flattenMessages(item, depth + 1));
    }
    if (typeof value === "object") {
        return Object.values(value as Record<string, unknown>).flatMap((item) =>
            flattenMessages(item, depth + 1),
        );
    }
    return [];
}

function extractMessageFromData(data: unknown): string | undefined {
    if (!data) return undefined;
    if (typeof data === "string") return data;
    if (typeof data === "object" && data !== null) {
        const record = data as Record<string, unknown>;
        const direct = [record.detail, record.message, record.error];
        for (const item of direct) {
            if (typeof item === "string" && item.trim()) {
                return item;
            }
        }
    }
    const messages = flattenMessages(data);
    return messages.length ? messages.join(" ") : undefined;
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const page = searchParams.get("page") || "1";
        const search = searchParams.get("search") || "";
        const ordering = searchParams.get("ordering") || "";

        const query = new URLSearchParams({
            page,
            search,
            ordering,
        }).toString();

        const data = await apiFetch(
            `/api/system-admin/organizations/?${query}`,
        );

        return NextResponse.json(data);
    } catch (err: unknown) {
        const { message, status, data } = getErrorMeta(err);
        const normalized = extractMessageFromData(data);
        if (data !== undefined) {
            console.error("ORG_LIST_ERROR_DATA:", data);
        }
        console.error("ORG_LIST_ERROR:", err);

        return NextResponse.json(
            {
                message:
                    (message && message !== "HTTP 400" ? message : normalized) ||
                    "Failed to fetch organizations",
                errors: data,
            },
            { status: status || 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        let body: Record<string, unknown>;
        try {
            const parsed = await req.json();
            body =
                parsed && typeof parsed === "object" && !Array.isArray(parsed)
                    ? (parsed as Record<string, unknown>)
                    : {};
        } catch {
            return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
        }

        const data = await apiFetch("/api/system-admin/organizations/", {
            method: "POST",
            json: body,
        });

        return NextResponse.json(data);
    } catch (err: unknown) {
        const { message, status, data } = getErrorMeta(err);
        const normalized = extractMessageFromData(data);
        if (data !== undefined) {
            console.error("ORG_CREATE_ERROR_DATA:", data);
        }
        console.error("ORG_CREATE_ERROR:", err);

        return NextResponse.json(
            {
                message:
                    (message && message !== "HTTP 400" ? message : normalized) ||
                    "Failed to create organization",
                errors: data,
            },
            { status: status || 500 }
        );
    }
}
