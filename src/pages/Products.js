import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    const snap = await getDocs(collection(db, "products"));
    setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const del = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetch();
  };
  const toggle = async (id, s) => {
    await updateDoc(doc(db, "products", id), {
      status: s === "in" ? "out" : "in",
    });
    fetch();
  };

  return (
    <div>
      <h2>Manage Products</h2>
      {products.map((p) => (
        <div key={p.id}>
          <img src={p.image} width="80" />
          {p.name} ₦{p.price} ({p.status})
          <button onClick={() => del(p.id)}>Delete</button>
          <button onClick={() => toggle(p.id, p.status)}>Toggle</button>
        </div>
      ))}
    </div>
  );
}
