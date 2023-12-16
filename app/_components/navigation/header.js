"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";

import ImageContainer from "@/app/_components/image-container";
import { AuthContext } from "@/app/_context/auth-context";
import { LocationsContext } from "@/app/_context/locations-context";
import { logoutUser } from "@/app/_firebase/auth";
import useScrollPosition from "@/app/_hooks/scroll-position";

import data from "@/app/_data/navigation-data.json";

const { general, admin } = data;

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const {
    setShowJohannesburg,
    setShowPretoria,
    setShowGeorge,
    setShowMosselBay,
    setShowClearFilter,
    setEnquireNowLocation,
  } = useContext(LocationsContext);
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
    setLoggedInUser(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <header className="header-container">
      {/* mobile nav */}
      <div
        className={`mobile-header ${
          scrollPosition >= 50 ? "mobile-header--scroll" : ""
        }`}
      >
        <Link href="/">
          <ImageContainer
            src="/carevita-fit-logo.jpg"
            alt="CareVita fit logo"
            width={80}
            height={80}
            smallest={30}
            phone={20}
            desktopSmall={10}
            desktop={10}
            eager
            cssClasses={`mobile-header__logo ${
              scrollPosition >= 50 ? "mobile-header__logo--scroll" : ""
            }`}
          />
        </Link>
        <button onClick={() => setToggleMenu(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 96 960 960"
            width="48"
            fill="#222222"
            className={`mobile-header__menu-button ${
              scrollPosition >= 50 ? "mobile-header__menu-button--scroll" : ""
            }`}
          >
            <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
          </svg>
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
                      setShowGeorge(true);
                      setShowJohannesburg(true);
                      setShowMosselBay(true);
                      setShowPretoria(true);
                      setShowClearFilter(false);
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
                      setShowGeorge(true);
                      setShowJohannesburg(true);
                      setShowMosselBay(true);
                      setShowPretoria(true);
                      setShowClearFilter(false);
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            width="48"
            fill="#ffffff"
          >
            <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
          </svg>
        </button>
      </nav>

      {/* desktop navigation */}
      <div
        className={`desktop-header ${
          scrollPosition >= 150 ? "desktop-header--scroll" : ""
        }`}
      >
        <div className="desktop-header__container">
          <Link href="/">
            <ImageContainer
              src="/carevita-fit-logo.jpg"
              alt="CareVita fit logo"
              width={80}
              height={80}
              smallest={30}
              phone={20}
              desktopSmall={10}
              desktop={10}
              eager
              cssClasses={`desktop-header__container__logo ${
                scrollPosition >= 150
                  ? "desktop-header__container__logo--scroll"
                  : ""
              }`}
            />
          </Link>
          <nav className="desktop-nav">
            <ul
              className={`desktop-nav__list ${
                scrollPosition >= 150 ? "desktop-nav__list--scroll" : ""
              }`}
            >
              {loggedInUser
                ? admin.map(({ title, url }, index) => (
                    <li className="desktop-nav__list-item" key={index}>
                      <Link
                        href={url}
                        onClick={() => {
                          setToggleMenu(false);
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
                    <li className="desktop-nav__list-item" key={index}>
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
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
