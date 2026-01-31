import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoreFront from "./pages/StoreFront";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StoreFront />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
