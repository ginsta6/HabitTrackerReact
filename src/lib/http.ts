export const API_URL = "http://localhost:3000/api";

export async function http<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers ?? {});
  // Ensure JSON by default
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  // Optional: accept JSON
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
});

  // 204 No Content
  if (res.status === 204) return undefined as T;

  // Try to parse response; fall back to text if not JSON
  const text = await res.text();
  const data = text ? safeParse(text) : undefined;

  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) ||
      text ||
      `HTTP ${res.status}`;
    throw new Error(message);
  }

  return (data as T) ?? (undefined as T);
}

function safeParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}
