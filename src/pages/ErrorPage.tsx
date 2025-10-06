// pages/ErrorPage.tsx
import {
  Link,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";

export default function ErrorPage() {
  const err = useRouteError();
  const isResp = isRouteErrorResponse(err);
  const status = isResp ? err.status : 500;
  const message = isResp
    ? err.statusText || err.data
    : "Something went wrong";

  return (
    <div style={{ padding: 24 }}>
      <h1>Oops</h1>
      <p>
        {status === 404
          ? "Not found or invalid date."
          : String(message)}
      </p>
      <Link to="/">Go to today</Link>
    </div>
  );
}
