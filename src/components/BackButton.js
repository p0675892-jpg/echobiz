import { useNavigate } from "react-router-dom";

export default function BackButton({ to = "/" }) {
  const nav = useNavigate();

  return (
    <button
      onClick={() => nav(to)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 14px",
        background: "#111",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginBottom: "15px"
      }}
    >
      <span style={{ fontSize: "18px" }}>←</span>
      Back
    </button>
  );
}
