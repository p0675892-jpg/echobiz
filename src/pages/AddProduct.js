import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name,
      price,
      image,
      phone,
      category,
    };

    const existing = JSON.parse(localStorage.getItem("products")) || [];
    const updated = [...existing, newProduct];

    localStorage.setItem("products", JSON.stringify(updated));
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/")}>⬅ Back</button>

      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
        <input placeholder="WhatsApp Number (234...)" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="Fashion">Fashion</option>
          <option value="Electronics">Electronics</option>
          <option value="Shoes">Shoes</option>
          <option value="Bags">Bags</option>
        </select>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
