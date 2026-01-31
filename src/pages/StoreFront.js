import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function StoreFront() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>EchoBiz StoreFront</h1>
      <p>Discover products & chat sellers instantly</p>

      <a href="/add" style={{
        display: "inline-block",
        marginBottom: "20px",
        padding: "10px 15px",
        background: "#007bff",
        color: "white",
        textDecoration: "none",
        borderRadius: "5px"
      }}>
        ➕ Sell a Product
      </a>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        {products.map(product => (
          <div key={product.id} style={{
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "5px"
          }}>
            <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{product.name}</h3>
            <p>₦{product.price}</p>

            <a
              href={`https://api.whatsapp.com/send?phone=${product.phone}&text=Hello I want to buy ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                marginTop: "10px",
                padding: "8px",
                background: "#25D366",
                color: "white",
                textAlign: "center",
                textDecoration: "none",
                borderRadius: "5px"
              }}
            >
              Chat to Buy on WhatsApp
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
