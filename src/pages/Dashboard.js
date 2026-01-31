import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), snap => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    alert("Deleted");
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => nav("/")}>← Back</button>
      <h2>Seller Dashboard</h2>

      {products.map(p => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{p.name}</h3>
          <p>₦{p.price}</p>
          <button onClick={() => nav(`/edit/${p.id}`)}>Edit</button>
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
