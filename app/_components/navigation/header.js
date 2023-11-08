"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import navigation from "@/app/_data/navigation-data.json";
import ImageContainer from "@/app/_components/image-container";

import menuIcon from "public/icons/menu-icon.svg";
import closeIcon from "public/icons/close-icon.svg";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

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
            {navigation.map(({ title, url }, index) => (
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
                {index < navigation.length - 1 && <hr />}
              </>
            ))}
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
              {navigation.map(({ title, url }, index) => (
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
