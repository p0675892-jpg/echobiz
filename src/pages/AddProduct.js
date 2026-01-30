import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const add = async () => {
    await addDoc(collection(db, "products"), {
      name,
      price: Number(price),
      image,
      status: "in",
      createdAt: new Date(),
    });
    alert("Added");
  };

  return (
    <div>
      <h2>Add Product</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <input
        placeholder="Image URL"
        onChange={(e) => setImage(e.target.value)}
      />
      <button onClick={add}>Add</button>
    </div>
  );
}
