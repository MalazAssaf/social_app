// ErrorPage.js
import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc( 100vh - 70px )",
        color: "#333",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "5rem", margin: "0" }}>404</h1>
      <h2 style={{ margin: "10px 0" }}>Page Not Found</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
