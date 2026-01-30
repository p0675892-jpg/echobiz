import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Dashboard({ products = [], sales = [] }) {
  const nav = useNavigate();
  const total = sales.reduce((a, b) => a + (b.amount || 0), 0);

  return (
    <div>
      <h2>Dashboard</h2>
      <button
        onClick={() => {
          signOut(auth);
          nav("/login");
        }}
      >
        Logout
      </button>
      <p>Total Products: {products.length}</p>
      <p>Total Sales: ₦{total}</p>
      <button onClick={() => nav("/add-product")}>Add Product</button>
      <button onClick={() => nav("/products")}>Manage Products</button>
      <button onClick={() => nav("/sales")}>Sales</button>
      <button onClick={() => nav("/storefront")}>StoreFront</button>
    </div>
  );
}
