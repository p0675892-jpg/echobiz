import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function SignUp(){
  const nav=useNavigate();
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");

  const signup=async()=>{
    await createUserWithEmailAndPassword(auth,email,pass);
    nav("/dashboard");
  };

  return(
    <div>
      <BackButton />
      <h2>Create Account</h2>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" onChange={e=>setPass(e.target.value)}/>
      <button onClick={signup}>Sign Up</button>
    </div>
  );
}
