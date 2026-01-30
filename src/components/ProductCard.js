products.map(product => (
  <div key={product.id} style={{
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px"
  }}>
    <img
      src={product.image}
      alt={product.name}
      style={{
        width: "100%",
        maxWidth: "250px",
        borderRadius: "10px"
      }}
    />

    <h2>{product.name}</h2>
    <p>₦{product.price}</p>

    <button
      onClick={() =>
        window.open(
          `https://wa.me/234XXXXXXXXXX?text=I want to buy ${product.name}`,
          "_blank"
        )
      }
    >
      Chat to Buy on WhatsApp
    </button>
  </div>
))