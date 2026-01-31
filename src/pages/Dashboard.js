import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), snap => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const remove = async (id) => {
    await deleteDoc(doc(db, "products", id));
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => auth.signOut()}>Logout</button>
      <h2>Seller Dashboard</h2>

      <Link to="/add">+ Add Product</Link>

      {products.map(p => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <img src={p.imageUrl} alt="" width="120" />
          <h3>{p.name}</h3>
          <p>₦{p.price}</p>

          <Link to={`/edit/${p.id}`}>✏ Edit</Link>
          <button onClick={() => remove(p.id)}>🗑 Delete</button>
        </div>
      ))}
    </div>
  );
}
