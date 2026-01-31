import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditProduct() {
  const { id } = useParams();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const snap = await getDoc(doc(db, "products", id));
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name);
        setPrice(data.price);
        setImageUrl(data.imageUrl);
        setWhatsapp(data.whatsapp);
      }
    };
    fetchProduct();
  }, [id]);

  const updateProduct = async () => {
    await updateDoc(doc(db, "products", id), {
      name,
      price: Number(price),
      imageUrl,
      whatsapp
    });
    nav("/");
  };

  return (
    <div>
      <button onClick={() => nav("/")}>⬅ Back</button>
      <h2>Edit Product</h2>

      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
      <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL" />
      <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp" />

      <button onClick={updateProduct}>Update Product</button>
    </div>
  );
}
