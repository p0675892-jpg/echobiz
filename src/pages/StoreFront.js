import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function StoreFront() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const shown = filter === "All"
    ? products
    : products.filter(p => p.category === filter);

  return (
    <div style={{ padding: 20 }}>
      <h1>EchoBiz Store</h1>
      <Link to="/login"><button>Seller Login</button></Link>
      <Link to="/add"><button>Sell Product</button></Link>

      <select onChange={e => setFilter(e.target.value)}>
        <option value="All">All Categories</option>
        <option>Fashion</option>
        <option>Electronics</option>
        <option>Shoes</option>
        <option>Bags</option>
      </select>

      {shown.map(p => (
        <div key={p.id} style={{border:"1px solid #ccc",margin:10,padding:10}}>
          <img src={p.image} width="150" />
          <h3>{p.name}</h3>
          <p>₦{p.price}</p>
          <p>{p.category}</p>
          <a href={`https://wa.me/${p.phone}?text=Hello I want ${p.name}`} target="_blank">
            <button>Buy on WhatsApp</button>
          </a>
        </div>
      ))}
    </div>
  );
}
