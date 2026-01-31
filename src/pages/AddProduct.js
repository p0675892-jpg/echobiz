import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [category, setCategory] = useState("Fashion");
  const [error, setError] = useState("");

  const nav = useNavigate();

  const handleSave = async () => {
    // 🔴 VALIDATION
    if (!name || !price || !imageUrl || !whatsapp) {
      setError("Please fill all fields");
      return;
    }

    if (isNaN(price)) {
      setError("Price must be a number");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        imageUrl,
        whatsapp,
        category,
        isPublic: true,
        createdAt: serverTimestamp()
      });

      nav("/"); // go back to store
    } catch (err) {
      setError("Error saving product");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => nav("/")}>⬅ Back</button>
      <h2>Add Product</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        placeholder="WhatsApp Number"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Fashion</option>
        <option>Electronics</option>
        <option>Shoes</option>
        <option>Bags</option>
      </select>

      <button onClick={handleSave}>Save Product</button>
    </div>
  );
}
