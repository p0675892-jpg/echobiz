import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [category, setCategory] = useState("Fashion");

  const handleSave = async () => {
    await addDoc(collection(db, "products"), {
      name,
      price: Number(price),
      imageUrl,
      whatsapp,
      category,
      createdAt: serverTimestamp(),
      isPublic: true
    });

    alert("Product Added!");
    nav("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => nav("/")}>← Back</button>
      <h2>Add Product</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <input placeholder="Image URL" onChange={e => setImageUrl(e.target.value)} />
      <input placeholder="WhatsApp Number" onChange={e => setWhatsapp(e.target.value)} />

      <select onChange={e => setCategory(e.target.value)}>
        <option>Fashion</option>
        <option>Electronics</option>
        <option>Shoes</option>
        <option>Bags</option>
      </select>

      <button onClick={handleSave}>Save</button>
    </div>
  );
}
