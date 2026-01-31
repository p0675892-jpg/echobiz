import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StoreFront() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>EchoBiz StoreFront</h1>
      <p>Discover products & chat sellers instantly</p>

      <button onClick={() => navigate("/add")}>Sell a Product</button>

      <br /><br />

      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All Categories</option>
        <option value="Fashion">Fashion</option>
        <option value="Electronics">Electronics</option>
        <option value="Shoes">Shoes</option>
        <option value="Bags">Bags</option>
      </select>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", marginTop: "20px" }}>
        {products
          .filter((p) => filter === "All" || p.category === filter)
          .map((product) => (
            <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
              <h3>{product.name}</h3>
              <p>₦{product.price}</p>
              <p>{product.category}</p>

              <a
                href={`https://api.whatsapp.com/send?phone=${product.phone}&text=Hello I want to buy ${product.name}`}
                target="_blank"
                rel="noreferrer"
              >
                <button style={{ background: "green", color: "white" }}>
                  Chat on WhatsApp
                </button>
              </a>

              <button onClick={() => deleteProduct(product.id)} style={{ background: "red", color: "white", marginTop: "5px" }}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default StoreFront;
