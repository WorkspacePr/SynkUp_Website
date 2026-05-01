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
        return { message: err.message, status: undefined, data: undefined };
    }

    return { message: undefined, status: undefined, data: undefined };
}

export async function POST(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    try {
        let body: Record<string, unknown> = {};
        try {
            const parsed = await req.json();
            if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
                body = parsed as Record<string, unknown>;
            }
        } catch {
            // Allow empty body.
        }

        let data: { message?: string };

        try {
            data = await apiFetch<{ message?: string }>(
                `/api/system-admin/organizations/${id}/reactivate/`,
                {
                    method: "POST",
                    ...(Object.keys(body).length ? { json: body } : {}),
                }
            );
        } catch (err: unknown) {
            const { status } = getErrorMeta(err);
            if (status !== 404) {
                throw err;
            }

            // Fallback: if action endpoint is unavailable, reactivate via status update.
            await apiFetch(`/api/system-admin/organizations/${id}/`, {
                method: "PATCH",
                json: { status: "active" },
            });
            data = { message: "Organization reactivated successfully" };
        }

        return NextResponse.json(data);
    } catch (err: unknown) {
        const { message, status, data } = getErrorMeta(err);

        return NextResponse.json(
            {
                message: message || "Failed to reactivate organization",
                errors: data,
            },
            { status: status || 500 }
        );
    }
}
