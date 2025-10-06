import type { LoaderFunctionArgs } from "react-router-dom";
import { parseDateParam, isFuture } from "../utils/date";

export async function HabitViewerLoader({
  params,
}: LoaderFunctionArgs) {
  const d = parseDateParam(params.date);
  if (!d || isFuture(d)) {
    throw new Response("Invalid date", { status: 404 });
  }
  return d;
}
