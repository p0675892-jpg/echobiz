import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreFront from "./pages/StoreFront";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoreFront />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
