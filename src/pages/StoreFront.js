import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function StoreFront() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Only show public products
        const publicProducts = list.filter((p) => p.isPublic === true);
        setProducts(publicProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>StoreFront</h1>

      {products.map((product) => {
        const whatsappLink = `https://wa.me/${product.whatsapp}?text=Hello I want to buy ${product.name}`;

        return (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px",
              maxWidth: "400px",
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: "100%", borderRadius: "6px" }}
            />

            <h2>{product.name}</h2>
            <p>₦{product.price}</p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Chat to Buy on WhatsApp
              </button>
            </a>
          </div>
        );
      })}
    </div>
  );
}
