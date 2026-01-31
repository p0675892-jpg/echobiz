import { useEffect,useState } from "react";
import { doc,getDoc,updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams,useNavigate } from "react-router-dom";

export default function EditProduct(){
  const {id}=useParams();
  const nav=useNavigate();
  const [name,setName]=useState("");
  const [price,setPrice]=useState("");
  const [imageUrl,setImageUrl]=useState("");
  const [category,setCategory]=useState("Fashion");

  useEffect(()=>{
    getDoc(doc(db,"products",id)).then(snap=>{
      if(snap.exists()){
        const d=snap.data();
        setName(d.name); setPrice(d.price); setImageUrl(d.imageUrl); setCategory(d.category);
      }
    });
  },[id]);

  const save=async()=>{
    await updateDoc(doc(db,"products",id),{name,price:Number(price),imageUrl,category});
    nav("/dashboard");
  };

  return(
    <div style={{padding:20}}>
      <button onClick={()=>nav(-1)}>← Back</button>
      <h2>Edit Product</h2>
      <input value={name} onChange={e=>setName(e.target.value)}/>
      <input value={price} onChange={e=>setPrice(e.target.value)}/>
      <input value={imageUrl} onChange={e=>setImageUrl(e.target.value)}/>
      <select value={category} onChange={e=>setCategory(e.target.value)}>
        <option>Fashion</option><option>Electronics</option><option>Shoes</option><option>Bags</option>
      </select>
      <button onClick={save}>Save</button>
    </div>
  );
}
