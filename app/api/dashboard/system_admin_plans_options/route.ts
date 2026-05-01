import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/http";

interface PlanOption {
  id: number | string;
  name: string;
  value: string;
}

function getErrorMeta(err: unknown) {
  if (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    "status" in err
  ) {
    const withMeta = err as { message?: string; status?: number };
    return {
      message: withMeta.message,
      status: withMeta.status,
    };
  }

  if (err instanceof Error) {
    return { message: err.message, status: undefined };
  }

  return { message: undefined, status: undefined };
}

function normalizePlanOptions(payload: unknown): PlanOption[] {
  const list = Array.isArray(payload)
    ? payload
    : typeof payload === "object" &&
      payload !== null &&
      "results" in payload &&
      Array.isArray((payload as { results?: unknown[] }).results)
      ? (payload as { results: unknown[] }).results
      : [];

  return list
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const candidate = item as Record<string, unknown>;
      const id = candidate.id ?? candidate.plan_id;
      const name = candidate.name ?? candidate.plan_name;
      const value =
        candidate.slug ??
        candidate.plan_slug ??
        candidate.code ??
        candidate.plan_code ??
        name ??
        id;

      if (
        (typeof id === "number" || typeof id === "string") &&
        typeof name === "string" &&
        (typeof value === "string" || typeof value === "number")
      ) {
        return { id, name, value: String(value) };
      }

      return null;
    })
    .filter((item): item is PlanOption => item !== null);
}

export async function GET() {
  const path = "/api/system-admin/plans/options/";

  let lastError: unknown;

  try {
    const data = await apiFetch(path);
    return NextResponse.json(normalizePlanOptions(data));
  } catch (err) {
    lastError = err;
  }

  const { message, status } = getErrorMeta(lastError);
  console.error("PLAN_OPTIONS_ERROR:", lastError);

  return NextResponse.json(
    { message: message || "Failed to fetch plan options" },
    { status: status || 500 }
  );
}
