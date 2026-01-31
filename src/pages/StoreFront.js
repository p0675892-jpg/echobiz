import React from "react";

const products = [
  {
    id: 1,
    name: "E-GOWN TEST",
    price: "₦3956",
    image: "https://via.placeholder.com/300x200.png?text=E-Gown",
    phone: "2348109430563"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "₦15,000",
    image: "https://via.placeholder.com/300x200.png?text=Smart+Watch",
    phone: "2348109430563"
  },
  {
    id: 3,
    name: "Ladies Handbag",
    price: "₦8,500",
    image: "https://via.placeholder.com/300x200.png?text=Handbag",
    phone: "2348109430563"
  },
  {
    id: 4,
    name: "Men Sneakers",
    price: "₦22,000",
    image: "https://via.placeholder.com/300x200.png?text=Sneakers",
    phone: "2348109430563"
  }
];

export default function StoreFront() {
  const handleWhatsApp = (product) => {
    const message = `Hello I want to buy ${product.name}`;
    const url = `https://wa.me/${product.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>EchoBiz StoreFront</h1>
      <p style={styles.subtitle}>Discover products & chat sellers instantly</p>

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3>{product.name}</h3>
            <p style={styles.price}>{product.price}</p>
            <button
              style={styles.button}
              onClick={() => handleWhatsApp(product)}
            >
              Chat to Buy on WhatsApp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    background: "#f5f5f5",
    minHeight: "100vh"
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold"
  },
  subtitle: {
    color: "gray",
    marginBottom: "20px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  image: {
    width: "100%",
    borderRadius: "8px"
  },
  price: {
    fontWeight: "bold",
    margin: "10px 0"
  },
  button: {
    background: "#25D366",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
