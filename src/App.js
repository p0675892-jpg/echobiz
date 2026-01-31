import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreFront from "./pages/StoreFront";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import { auth } from "./firebase";

function App() {
  const user = auth.currentUser;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoreFront />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Login />}
        />
        <Route
          path="/add"
          element={user ? <AddProduct /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
