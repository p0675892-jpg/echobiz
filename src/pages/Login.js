import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const nav=useNavigate();

  const handle=async()=>{
    await signInWithEmailAndPassword(auth,email,pass);
    nav("/");
  };

  return(
    <div>
      <h2>Seller Login</h2>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" onChange={e=>setPass(e.target.value)}/>
      <button onClick={handle}>Login</button>
      <p>No account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}