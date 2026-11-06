import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="center-msg">
      <h2>404</h2>
      <p>Page not found.</p>
      <Link to="/">Back to Vendors</Link>
    </div>
  );
}

export default NotFoundPage;
