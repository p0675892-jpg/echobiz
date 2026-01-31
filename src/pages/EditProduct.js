import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

export default function EditProduct(){
  const {id}=useParams();
  const nav=useNavigate();
  const [data,setData]=useState({});

  useEffect(()=>{
    getDoc(doc(db,"products",id)).then(d=>setData(d.data()));
  },[]);

  const save=async()=>{
    await updateDoc(doc(db,"products",id),data);
    nav("/dashboard");
  };

  return(
    <div>
      <BackButton to="/dashboard"/>
      <h2>Edit Product</h2>
      <input value={data.name||""} onChange={e=>setData({...data,name:e.target.value})}/>
      <input value={data.price||""} onChange={e=>setData({...data,price:e.target.value})}/>
      <button onClick={save}>Update</button>
    </div>
  );
}
