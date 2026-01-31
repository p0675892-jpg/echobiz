import React from "react";
import "./App.css";

const products = [
  {
    name: "E-GOWN TEST",
    price: "₦3956",
    image: "https://via.placeholder.com/200",
    phone: "2348109430563"
  },
  {
    name: "Smart Watch",
    price: "₦15,000",
    image: "https://via.placeholder.com/200",
    phone: "2348109430563"
  },
  {
    name: "Ladies Handbag",
    price: "₦8,500",
    image: "https://via.placeholder.com/200",
    phone: "2348109430563"
  },
  {
    name: "Men Sneakers",
    price: "₦22,000",
    image: "https://via.placeholder.com/200",
    phone: "2348109430563"
  }
];

function App() {
  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <h1>EchoBiz StoreFront</h1>
        <p>Discover products & chat sellers instantly</p>
      </header>

      {/* PRODUCT GRID */}
      <div className="product-grid">
        {products.map((product, index) => {
          const message = `Hello I want to buy ${product.name}`;
          const whatsappLink = `https://api.whatsapp.com/send?phone=${product.phone}&text=${encodeURIComponent(message)}`;

          return (
            <div key={index} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <button className="buy-btn">Chat to Buy on WhatsApp</button>
              </a>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 EchoBiz — Chat sellers directly via WhatsApp</p>
      </footer>

    </div>
  );
}

export default App;
