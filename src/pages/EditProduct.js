import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Fashion");

  useEffect(() => {
    const fetchProduct = async () => {
      const snap = await getDoc(doc(db, "products", id));
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name);
        setPrice(data.price);
        setImageUrl(data.imageUrl);
        setCategory(data.category);
      }
    };
    fetchProduct();
  }, [id]);

  const save = async () => {
    await updateDoc(doc(db, "products", id), {
      name,
      price: Number(price),
      imageUrl,
      category
    });
    nav("/dashboard");
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => nav(-1)}>← Back</button>
      <h2>Edit Product</h2>

      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
      <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL" />

      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option>Fashion</option>
        <option>Electronics</option>
        <option>Shoes</option>
        <option>Bags</option>
      </select>

      <button onClick={save}>Save Changes</button>
    </div>
  );
}
