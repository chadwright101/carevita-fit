"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { loginWithEmailAndPassword } from "@/app/_firebase/auth";
import Recaptcha from "@/app/_lib/Recaptcha";

import Heading from "../_components/heading";
import { isValidEmail } from "../_lib/IsValidEmail";

import visibleImage from "@/public/icons/visibility.svg";
import visibleOffImage from "@/public/icons/visibility-off.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [revealPassword, setRevealPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validateRecaptcha, setValidateRecaptcha] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setIsLoading(true);
      const user = await loginWithEmailAndPassword(email, password);
      router.push("/admin/dashboard");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (isValidEmail(email)) {
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
            disabled={!validateRecaptcha}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>
        {!showPassword ? (
          <>
            <button
              type="button"
              className="admin-button login-page__form__button"
              onClick={handleNext}
              disabled={!validateRecaptcha}
            >
              Next
            </button>
            {!validateRecaptcha ? (
              <Recaptcha onChange={() => setValidateRecaptcha(true)} />
            ) : null}
          </>
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
            {error && (
              <p className="login-page__form__error">
                Login failed: Either the password or email is incorrect. If the
                problem persists, please contact the developer.
              </p>
            )}
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <button
                type="submit"
                className="admin-button login-page__form__button"
                disabled={!validateRecaptcha}
              >
                Log in
              </button>
            )}
          </>
        )}
      </form>
    </main>
  );
}
