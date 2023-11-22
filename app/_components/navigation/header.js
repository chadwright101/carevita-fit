"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import ImageContainer from "@/app/_components/image-container";
import { AuthContext } from "@/app/_context/auth-context";
import { LocationsContext } from "@/app/_context/locations-context";
import { logoutUser } from "@/app/_firebase/auth";
import useScrollPosition from "@/app/_hooks/scroll-position";

import data from "@/app/_data/navigation-data.json";

import menuIcon from "public/icons/menu-icon.svg";
import closeIcon from "public/icons/close-icon.svg";

const { general, admin } = data;

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const { setEnquireNowLocation } = useContext(LocationsContext);
  const router = useRouter();
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (toggleMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [toggleMenu]);

  const handleSignOut = async (e) => {
    logoutUser();
    router.push("/login");
    setLoggedInUser(false);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <header className="header-container">
      {/* mobile nav */}
      <div className="mobile-header">
        <Link href="/">
          <ImageContainer
            src="/carevita-fit-logo.jpg"
            alt="CareVita fit logo"
            width={scrollPosition > 50 ? 50 : 80}
            height={scrollPosition > 50 ? 50 : 80}
            smallest={30}
            phone={20}
            desktopSmall={10}
            desktop={10}
            eager
            cssClasses="mobile-header__logo"
          />
        </Link>
        <button onClick={() => setToggleMenu(true)}>
          <Image
            src={menuIcon}
            alt="Menu icon"
            className="mobile-header__menu-button"
          />
        </button>
      </div>
      <nav className={`mobile-nav ${toggleMenu ? "mobile-nav--open" : ""}`}>
        <ul
          className={`mobile-nav__list ${
            toggleMenu ? "mobile-nav__list--open" : ""
          }`}
        >
          {loggedInUser
            ? admin.map(({ title, url }, index) => (
                <li className="mobile-nav__list-item" key={index}>
                  <Link
                    className="mobile-nav__link"
                    href={url}
                    onClick={() => {
                      setToggleMenu(false);
                      if (title === "Sign Out") {
                        handleSignOut();
                      }
                      setEnquireNowLocation("");
                    }}
                  >
                    {title}
                  </Link>
                  {index < general.length - 2 && <hr />}
                </li>
              ))
            : general.map(({ title, url }, index) => (
                <li className="mobile-nav__list-item" key={index}>
                  <Link
                    className="mobile-nav__link"
                    href={url}
                    onClick={() => {
                      setToggleMenu(false);
                      setEnquireNowLocation("");
                    }}
                  >
                    {title}
                  </Link>
                  {index < general.length - 1 && <hr />}
                </li>
              ))}
          {!loggedInUser && (
            <li
              className={`mobile-nav__admin-button ${
                toggleMenu ? "mobile-nav__admin-button--open" : ""
              }`}
            >
              <Link href="/login" onClick={() => setToggleMenu(false)}>
                Admin Login
              </Link>
            </li>
          )}
        </ul>
        <button
          className="mobile-nav__close-button"
          onClick={() => setToggleMenu(false)}
        >
          <Image src={closeIcon} alt="Close menu icon" />
        </button>
      </nav>

      {/* desktop navigation */}
      <div className="desktop-header">
        <div className="desktop-header__container">
          <Link href="/">
            <ImageContainer
              src="/carevita-fit-logo.jpg"
              alt="CareVita fit logo"
              width={scrollPosition > 150 ? 60 : 80}
              height={scrollPosition > 150 ? 60 : 80}
              smallest={30}
              phone={20}
              desktopSmall={10}
              desktop={10}
              eager
              cssClasses="desktop-header__container__logo"
            />
          </Link>
          <nav className="desktop-nav">
            <ul className="desktop-nav__list">
              {loggedInUser
                ? admin.map(({ title, url }, index) => (
                    <li className="desktop-nav__list-item" key={index}>
                      <Link
                        href={url}
                        onClick={
                          title === "Sign Out"
                            ? handleSignOut
                            : () => setEnquireNowLocation("")
                        }
                      >
                        {title}
                      </Link>
                    </li>
                  ))
                : general.map(({ title, url }, index) => (
                    <li className="desktop-nav__list-item" key={index}>
                      <Link
                        href={url}
                        onClick={() => setEnquireNowLocation("")}
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
