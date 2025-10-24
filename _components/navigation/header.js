"use client";

import Link from "next/link";
import { useState, useContext } from "react";

import ImageContainer from "@/_components/image-container";
import { AuthContext } from "@/_context/auth-context";
import { LocationsContext } from "@/_context/locations-context";
import { logoutUser } from "@/_firebase/auth";
import useScrollPosition from "@/_hooks/scroll-position";
import useBodyScrollLock from "@/_hooks/use-body-scroll-lock";

import data from "@/_data/navigation-data.json";
import Image from "next/image";

const { general, admin } = data;

const Header = () => {
  const [menu, setMenu] = useState({ toggle: false });
  const { userUid } = useContext(AuthContext);
  const {
    showClearFilter,
    setShowClearFilter,
    enquireNowLocation,
    setEnquireNowLocation,
    showAllCities,
  } = useContext(LocationsContext);
  const scrollPosition = useScrollPosition();

  // Use the custom hook to manage body scroll locking
  useBodyScrollLock(menu.toggle);

  const toggleMenu = () => {
    setMenu((prevState) => ({ ...prevState, toggle: !prevState.toggle }));
  };
  const handleSignOut = async (e) => {
    logoutUser();
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
            src="/images/carevita-fit-logo.webp"
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
        <button onClick={toggleMenu}>
          <Image
            src="/icons/menu-icon2.svg"
            alt="Menu icon"
            width={44}
            height={44}
            className={`mobile-header__menu-button ${
              scrollPosition >= 50 ? "mobile-header__menu-button--scroll" : ""
            }`}
          />
        </button>
      </div>
      <nav className={`mobile-nav ${menu.toggle ? "mobile-nav--open" : ""}`}>
        <ul
          className={`mobile-nav__list ${
            menu.toggle ? "mobile-nav__list--open" : ""
          }`}
        >
          {userUid
            ? admin.map(({ title, url }, index) => (
                <li className="mobile-nav__list-item" key={index}>
                  <Link
                    className="mobile-nav__link"
                    href={url}
                    onClick={() => {
                      toggleMenu();
                      if (title === "Sign Out") {
                        handleSignOut();
                      }
                      setEnquireNowLocation("");
                      showAllCities();
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
                      toggleMenu();
                      setEnquireNowLocation("");
                      showAllCities();
                    }}
                  >
                    {title}
                  </Link>
                  {index < general.length - 1 && <hr />}
                </li>
              ))}
          {!userUid && (
            <li className={`mobile-nav__admin-button`}>
              <Link href="/login" onClick={toggleMenu}>
                Admin Login
              </Link>
            </li>
          )}
        </ul>
        <button className="mobile-nav__close-button" onClick={toggleMenu}>
          <Image
            src="/icons/close-icon2.svg"
            alt="Close menu icon"
            width={48}
            height={48}
          />
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
              src="/images/carevita-fit-logo.webp"
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
              {userUid
                ? admin.map(({ title, url }, index) => (
                    <li className="desktop-nav__list-item" key={index}>
                      <Link
                        href={url}
                        onClick={() => {
                          toggleMenu();
                          if (title === "Sign Out") {
                            handleSignOut();
                          }
                          setEnquireNowLocation("");
                          showAllCities();
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
                          showAllCities();
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
