"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import ImageContainer from "@/app/_components/image-container";
import { AuthContext } from "@/app/_context/auth-context";
import { logoutUser } from "@/app/_firebase/auth";

import data from "@/app/_data/navigation-data.json";

import menuIcon from "public/icons/menu-icon.svg";
import closeIcon from "public/icons/close-icon.svg";

const { general, admin } = data;

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const router = useRouter();

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
            width={80}
            height={80}
            smallest={30}
            phone={20}
            desktopSmall={10}
            desktop={10}
            eager
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
      {toggleMenu && (
        <nav className="mobile-nav">
          <ul className="mobile-nav__list">
            {loggedInUser
              ? admin.map(({ title, url }, index) => (
                  <>
                    <li className="mobile-nav__list-item" key={index}>
                      <Link
                        className="mobile-nav__link"
                        href={url}
                        onClick={() => {
                          setToggleMenu(false);
                          if (title === "Sign Out") {
                            handleSignOut();
                          }
                        }}
                      >
                        {title}
                      </Link>
                    </li>
                    {index < general.length - 2 && <hr />}
                  </>
                ))
              : general.map(({ title, url }, index) => (
                  <>
                    <li className="mobile-nav__list-item" key={index}>
                      <Link
                        className="mobile-nav__link"
                        href={url}
                        onClick={() => setToggleMenu(false)}
                      >
                        {title}
                      </Link>
                    </li>
                    {index < general.length - 1 && <hr />}
                  </>
                ))}
            {!loggedInUser && (
              <li class="mobile-nav__admin-button">
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
      )}

      {/* desktop navigation */}
      <div className="desktop-header">
        <div className="desktop-header__container">
          <Link href="/">
            <Image
              src="/carevita-fit-logo.jpg"
              alt="CareVita logo"
              width={80}
              height={80}
              priority
              sizes="(max-width: 900px) 65px, (max-width: 1400px) 65px, 65px"
            />
          </Link>
          <nav className="desktop-nav">
            <ul className="desktop-nav__list">
              {loggedInUser
                ? admin.map(({ title, url }, index) => (
                    <li className="desktop-nav__list-item" key={index}>
                      <Link
                        href={url}
                        onClick={title === "Sign Out" ? handleSignOut : null}
                      >
                        {title}
                      </Link>
                    </li>
                  ))
                : general.map(({ title, url }, index) => (
                    <li className="desktop-nav__list-item" key={index}>
                      <Link href={url}>{title}</Link>
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
