import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !image || !phone) {
      alert("Fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name,
        price,
        image,
        phone,
        createdAt: new Date(),
      });

      alert("Product Added!");
      setName("");
      setPrice("");
      setImage("");
      setPhone("");
    } catch (err) {
      console.log(err);
      alert("Error adding product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />

        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        /><br /><br />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        /><br /><br />

        <input
          type="text"
          placeholder="WhatsApp Number (234...)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /><br /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
