import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Fashion");
  const [whatsapp, setWhatsapp] = useState("");

  const save = async () => {
    if (!name || !price || !imageUrl || !whatsapp) {
      alert("All fields required");
      return;
    }

    if (!imageUrl.startsWith("http")) {
      alert("Enter valid image URL");
      return;
    }

    await addDoc(collection(db, "products"), {
      name,
      price: Number(price),
      imageUrl,
      category,
      whatsapp
    });

    nav("/dashboard");
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => nav(-1)}>← Back</button>
      <h2>Add Product</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <input placeholder="Image URL" onChange={e => setImageUrl(e.target.value)} />

      <select onChange={e => setCategory(e.target.value)}>
        <option>Fashion</option>
        <option>Electronics</option>
        <option>Shoes</option>
        <option>Bags</option>
      </select>

      <input placeholder="WhatsApp Number" onChange={e => setWhatsapp(e.target.value)} />

      <button onClick={save}>Save Product</button>
    </div>
  );
}
