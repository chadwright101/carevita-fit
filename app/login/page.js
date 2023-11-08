"use client";

import { useContext } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/app/_context/auth-context";
import { loginWithEmailAndPassword } from "@/app/_firebase/firebase";
import Heading from "../_components/heading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  useEffect(() => {
    if (loggedInUser) {
      router.push("/admin/dashboard");
    }
  }, [loggedInUser, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const user = await loginWithEmailAndPassword(email, password);
      setLoggedInUser(true);
      await router.push("/admin/dashboard");
    } catch (error) {
      alert(
        "Login failed: Either the password or email is incorrect",
        error.message
      );
      setError(error.message);
    }
  };

  return (
    <main>
      <Heading pageHeading>Admin Login</Heading>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        <br />
        <button type="submit">Log in</button>
      </form>
    </main>
  );
}
