import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import StoreFront from "./pages/StoreFront";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return null;

  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        
        {/* HEADER */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          background: "#000",
          color: "#D4AF37"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="/logo.png" alt="logo" style={{ height: "40px" }} />
            <h2 style={{ margin: 0 }}>EchoBiz</h2>
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <Link to="/" style={navStyle}>Store</Link>
            {user && <Link to="/dashboard" style={navStyle}>Dashboard</Link>}
            <Link to="/add" style={navStyle}>Sell</Link>
            {!user && <Link to="/login" style={navStyle}>Login</Link>}
          </div>
        </div>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<StoreFront />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<Protected user={user}><AddProduct /></Protected>} />
          <Route path="/dashboard" element={<Protected user={user}><Dashboard /></Protected>} />
        </Routes>
      </div>
    </Router>
  );
}

function Protected({ user, children }) {
  if (!user) return <Navigate to="/login" />;
  return children;
}

const navStyle = {
  textDecoration: "none",
  color: "#D4AF37",
  fontWeight: "bold"
};
