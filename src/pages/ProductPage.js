import { useParams } from "react-router-dom";
export default function ProductPage({ products = [] }) {
  const { id } = useParams();
  const p = products.find((x) => x.id === id);
  if (!p) return <p>Loading...</p>;

  return (
    <div>
      <img src={p.image} width="250" />
      <h2>{p.name}</h2>
      <p>₦{p.price}</p>
      <a href={`https://wa.me/?text=I want to buy ${p.name}`} target="_blank">
        Buy on WhatsApp
      </a>
    </div>
  );
}
