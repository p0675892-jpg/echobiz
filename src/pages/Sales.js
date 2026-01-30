import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "sales"));
      setSales(snap.docs.map((d) => d.data()));
    })();
  }, []);

  return (
    <div>
      <h2>Sales History</h2>
      {sales.map((s, i) => (
        <div key={i}>
          {s.productName} — ₦{s.amount}
        </div>
      ))}
    </div>
  );
}
