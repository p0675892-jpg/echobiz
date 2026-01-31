import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const del = async (id) => {
    await deleteDoc(doc(db, "products", id));
  };

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">⬅ Back</Link>
      <h2>Seller Dashboard</h2>
      <Link to="/add">➕ Add Product</Link>

      {products.map(p => (
        <div key={p.id} style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}>
          <img src={p.imageUrl} width="100" />
          <h3>{p.name}</h3>
          <p>₦{p.price}</p>
          <Link to={`/edit/${p.id}`}>✏ Edit</Link>
          <button onClick={() => del(p.id)}>🗑 Delete</button>
        </div>
      ))}
    </div>
  );
}
