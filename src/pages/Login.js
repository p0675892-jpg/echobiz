import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handle = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      nav("/dashboard"); // 🔒 send seller inside
    } catch (err) {
      setError("Wrong email or password");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Seller Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <button onClick={handle}>Login</button>

      <p>
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
