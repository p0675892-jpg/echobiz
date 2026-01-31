import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";

import StoreFront from "./pages/StoreFront";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";

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

  if (loading) return <h2>Loading...</h2>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoreFront />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/add-product"
          element={user ? <AddProduct /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}
