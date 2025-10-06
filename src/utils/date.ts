// utils/date.ts
export function toISO(d: Date) {
  // normalized YYYY-MM-DD (zero-padded)
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseDateParam(s?: string | null) {
  if (!s) return null;
  // Accept "YYYY-M-D" or "YYYY-MM-DD"
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s);
  if (!m) return null;
  const y = +m[1],
    mo = +m[2],
    d = +m[3];
  const date = new Date(y, mo - 1, d);
  // guard against invalid (e.g., 2025-02-30)
  return date.getFullYear() === y &&
    date.getMonth() === mo - 1 &&
    date.getDate() === d
    ? date
    : null;
}

export function isFuture(d: Date) {
  return d.getTime() > new Date().getTime();
}