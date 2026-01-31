import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function StoreFront() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, "products"), snap =>
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 className="gold">Discover Products</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
        {products.map(p => (
          <div className="card" key={p.id}>
            <img src={p.imageUrl} alt="" style={{ width: "100%", borderRadius: 10 }} />
            <h3>{p.name}</h3>
            <p className="gold">₦{p.price}</p>
            <a href={`https://wa.me/${p.whatsapp}?text=I want to buy ${p.name}`} target="_blank">
              <button>Chat Seller</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
