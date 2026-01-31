import { useEffect,useState } from "react";
import { collection,query,where,onSnapshot,deleteDoc,doc } from "firebase/firestore";
import { db,auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Dashboard(){
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    const q=query(collection(db,"products"),where("ownerId","==",auth.currentUser.uid));
    const unsub=onSnapshot(q,snap=>setProducts(snap.docs.map(d=>({id:d.id,...d.data()}))));
    return ()=>unsub();
  },[]);

  const remove=async(id)=>await deleteDoc(doc(db,"products",id));

  return(
    <div style={{padding:20}}>
      <h2>My Products</h2>
      <Link to="/add">+ Add</Link>

      {products.map(p=>(
        <div key={p.id} style={{border:"1px solid #ccc",margin:10,padding:10}}>
          <img src={p.imageUrl} width="120" alt=""/>
          <h3>{p.name}</h3>
          <p>₦{p.price}</p>
          <Link to={`/edit/${p.id}`}>✏ Edit</Link>
          <button onClick={()=>remove(p.id)}>🗑 Delete</button>
        </div>
      ))}
    </div>
  );
}
