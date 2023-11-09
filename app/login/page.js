"use client";

import { useContext } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { AuthContext } from "@/app/_context/auth-context";
import { loginWithEmailAndPassword } from "@/app/_firebase/auth";
import Heading from "../_components/heading";

import visibleImage from "@/public/icons/visibility.svg";
import visibleOffImage from "@/public/icons/visibility-off.svg";

const isValidEmail = (email) => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(email);
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [validEmail, setValidEmail] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const router = useRouter();

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
      setError(error.message);
    }
  };

  const handleNext = () => {
    if (isValidEmail(email)) {
      setValidEmail(true);
      setShowPassword(true);
    } else {
      alert("Please enter a valid email address");
    }
  };

  return (
    <main className="login-page">
      <Heading pageHeading className="login-page__heading">
        Admin Login
      </Heading>
      <form className="login-page__form" onSubmit={handleLogin}>
        <div className="login-page__form__group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>
        {!showPassword ? (
          <button
            type="button"
            className="admin-button login-page__form__button"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <>
            <div className="login-page__form__group">
              <label htmlFor="password">Password:</label>
              <div className="login-page__form__group__password">
                <input
                  type={revealPassword ? "text" : "password"}
                  value={password}
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                {revealPassword ? (
                  <button
                    className="login-page__form__group__password__button"
                    onClick={() => setRevealPassword(false)}
                    type="button"
                  >
                    <Image
                      src={visibleOffImage}
                      alt="Hide password"
                      width={25}
                      height={25}
                    />
                  </button>
                ) : (
                  <button
                    className="login-page__form__group__password__button"
                    onClick={() => setRevealPassword(true)}
                    type="button"
                  >
                    <Image
                      src={visibleImage}
                      alt="Show password"
                      width={25}
                      height={25}
                    />
                  </button>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="admin-button login-page__form__button"
            >
              Log in
            </button>
            {error && (
              <p>Login failed: Either the password or email is incorrect</p>
            )}
          </>
        )}
      </form>
    </main>
  );
}
