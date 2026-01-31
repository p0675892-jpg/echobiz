import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Dashboard(){
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    const q = query(collection(db,"products"), where("seller","==",auth.currentUser.uid));
    const unsub = onSnapshot(q,(snap)=>{
      setProducts(snap.docs.map(d=>({id:d.id,...d.data()})));
    });
    return ()=>unsub();
  },[]);

  return(
    <div>
      <BackButton />
      <h2>My Products</h2>
      <Link to="/add"><button>Add New</button></Link>
      {products.map(p=>(
        <div key={p.id}>
          <h3>{p.name}</h3>
          <Link to={`/edit/${p.id}`}><button>Edit</button></Link>
          <button onClick={()=>deleteDoc(doc(db,"products",p.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}
