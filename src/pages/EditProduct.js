import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function EditProduct() {
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    getDoc(doc(db, "products", id)).then(d => setData(d.data()));
  }, [id]);

  const save = async () => {
    await updateDoc(doc(db, "products", id), data);
    nav("/dashboard");
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => nav(-1)}>⬅ Back</button>
      <h2>Edit Product</h2>

      <input value={data.name || ""} onChange={e => setData({ ...data, name: e.target.value })} placeholder="Name" />
      <input value={data.price || ""} onChange={e => setData({ ...data, price: e.target.value })} placeholder="Price" />
      <input value={data.imageUrl || ""} onChange={e => setData({ ...data, imageUrl: e.target.value })} placeholder="Image URL" />
      <button onClick={save}>Save</button>
    </div>
  );
}
