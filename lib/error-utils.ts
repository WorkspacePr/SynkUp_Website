"use client";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function collectMessages(value: unknown, depth = 0): string[] {
  if (depth > 3 || value == null) {
    return [];
  }

  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectMessages(item, depth + 1));
  }

  if (isRecord(value)) {
    return Object.values(value).flatMap((item) =>
      collectMessages(item, depth + 1),
    );
  }

  return [];
}

export function extractErrorMessage(payload: unknown): string | null {
  if (!payload) {
    return null;
  }

  if (payload instanceof Error) {
    return payload.message;
  }

  if (typeof payload === "string") {
    return payload;
  }

  if (!isRecord(payload)) {
    return null;
  }

  const direct = [payload.detail, payload.message, payload.error];
  for (const item of direct) {
    if (typeof item === "string" && item.trim()) {
      return item;
    }
  }

  if (typeof payload.errors === "string" && payload.errors.trim()) {
    return payload.errors;
  }

  if (isRecord(payload.errors) || Array.isArray(payload.errors)) {
    const errors = collectMessages(payload.errors);
    if (errors.length) {
      return errors.join(" ");
    }
  }

  const messages = collectMessages(payload);
  if (messages.length) {
    return messages.join(" ");
  }

  return null;
}

export function safeJsonParse(text: string): unknown {
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return text;
  }
}
