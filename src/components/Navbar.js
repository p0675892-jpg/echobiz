import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 25px",
      background: "#111",
      borderBottom: "1px solid #222"
    }}>
      <h2 className="gold">EchoBiz</h2>

      <div style={{ display: "flex", gap: 20 }}>
        <Link to="/">Store</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  );
}
