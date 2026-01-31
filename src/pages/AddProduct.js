import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function AddProduct() {
  const nav = useNavigate();
  const [data, setData] = useState({
    name:"", price:"", image:"", phone:"", category:"Fashion"
  });

  const save = async () => {
    await addDoc(collection(db,"products"), {
      ...data,
      seller: auth.currentUser.uid
    });
    nav("/dashboard");
  };

  return (
    <div>
      <BackButton />
      <h2>Add Product</h2>
      <input placeholder="Name" onChange={e=>setData({...data,name:e.target.value})}/>
      <input placeholder="Price" onChange={e=>setData({...data,price:e.target.value})}/>
      <input placeholder="Image URL" onChange={e=>setData({...data,image:e.target.value})}/>
      <input placeholder="WhatsApp Phone" onChange={e=>setData({...data,phone:e.target.value})}/>
      <select onChange={e=>setData({...data,category:e.target.value})}>
        <option>Fashion</option><option>Electronics</option>
        <option>Shoes</option><option>Bags</option>
      </select>
      <button onClick={save}>Save</button>
    </div>
  );
}
