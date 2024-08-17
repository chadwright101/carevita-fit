"use client";

import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";

import ImageContainer from "@/app/_components/image-container";
import { AuthContext } from "@/app/_context/auth-context";
import { LocationsContext } from "@/app/_context/locations-context";
import { logoutUser } from "@/app/_firebase/auth";

import data from "@/app/_data/navigation-data.json";

const currentYear = new Date().getFullYear();

const { general, admin } = data;

const Footer = () => {
  const { userUid } = useContext(AuthContext);
  const {
    setShowJohannesburg,
    setShowPretoria,
    setShowGeorge,
    setShowMosselBay,
    setShowClearFilter,
    setEnquireNowLocation,
  } = useContext(LocationsContext);
  const router = useRouter();

  const handleSignOut = async (e) => {
    logoutUser();
    router.push("/login");
  };

  return (
    <footer>
      <div className="footer-container">
        <div className="footer__flex">
          <nav className="footer-nav">
            <ul className="footer-nav__list">
              {userUid
                ? admin.map(({ title, url }, index) => (
                    <li className="footer-nav__list-item" key={index}>
                      <Link
                        href={url}
                        onClick={() => {
                          if (title === "Sign Out") {
                            handleSignOut();
                          }
                          setEnquireNowLocation("");
                          setShowGeorge(true);
                          setShowJohannesburg(true);
                          setShowMosselBay(true);
                          setShowPretoria(true);
                          setShowClearFilter(false);
                        }}
                      >
                        {title}
                      </Link>
                    </li>
                  ))
                : general.map(({ title, url }, index) => (
                    <li className="footer-nav__list-item" key={index}>
                      <Link
                        href={url}
                        onClick={() => {
                          setEnquireNowLocation("");
                          setShowGeorge(true);
                          setShowJohannesburg(true);
                          setShowMosselBay(true);
                          setShowPretoria(true);
                          setShowClearFilter(false);
                        }}
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
              {!userUid && (
                <li className="footer-nav__list-item">
                  <Link href="/login">Admin Login</Link>
                </li>
              )}
            </ul>
          </nav>
          <div className="footer__flex__logo">
            <ImageContainer
              src="/images/carevita-fit-logo.webp"
              alt="CareVita logo"
              width={120}
              height={100}
              smallest={30}
              phone={20}
              desktopSmall={10}
              desktop={10}
            />
            <p className="footer__flex__developed-by">
              Designed & developed by:
              <a href="https://www.thewrightdesigns.co.za" target="_blank">
                The Wright Designs
              </a>
            </p>
          </div>
          <hr className="footer__flex__line" />
        </div>
        <p className="footer-container__copyright">
          © CareVita {currentYear}
          <Link href="https://www.carevita.co.za">fit.carevita.co.za</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
