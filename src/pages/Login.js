import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Login(){
  const nav=useNavigate();
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");

  const login=async()=>{
    await signInWithEmailAndPassword(auth,email,pass);
    nav("/dashboard");
  };

  return(
    <div>
      <BackButton />
      <h2>Seller Login</h2>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" onChange={e=>setPass(e.target.value)}/>
      <button onClick={login}>Login</button>
      <p>No account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}
