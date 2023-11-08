"use client";

import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";

import ImageContainer from "@/app/_components/image-container";
import { AuthContext } from "@/app/_context/auth-context";
import { logoutUser } from "@/app/_firebase/firebase";

import data from "@/app/_data/navigation-data.json";

const currentYear = new Date().getFullYear();

const { general, admin } = data;

const Footer = () => {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const router = useRouter();

  const handleSignOut = async (e) => {
    logoutUser();
    router.push("/login");
    setLoggedInUser(false);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <footer>
      <div className="footer-container">
        <div className="desktop-flex">
          <nav>
            <ul>
              {loggedInUser
                ? admin.map(({ title, url }, index) => (
                    <li key={index}>
                      <Link
                        href={url}
                        onClick={title === "Sign Out" ? handleSignOut : null}
                      >
                        {title}
                      </Link>
                    </li>
                  ))
                : general.map(({ title, url }, index) => (
                    <li key={index}>
                      <Link href={url}>{title}</Link>
                    </li>
                  ))}
              {!loggedInUser && (
                <li>
                  <Link href="/login">Admin Login</Link>
                </li>
              )}
            </ul>
          </nav>
          <div className="logo">
            <ImageContainer
              src="/carevita-fit-logo.jpg"
              alt="CareVita logo"
              width={120}
              height={100}
              smallest={30}
              phone={20}
              desktopSmall={10}
              desktop={10}
            />
            <p className="developed-by">
              Designed & developed by:
              <a href="https://www.thewrightdesigns.co.za" target="_blank">
                The Wright Designs
              </a>
            </p>
          </div>
          <hr />
        </div>
        <p className="copyright">
          © CareVita {currentYear}
          <Link href="https://www.carevita.co.za">fit.carevita.co.za</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
