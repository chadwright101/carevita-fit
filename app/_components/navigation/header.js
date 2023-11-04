"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import data from "@/app/_data/navigation-data.json";
import ImageContainer from "@/app/_components/image-container";

import menuIcon from "public/icons/menu-icon.svg";
import closeIcon from "public/icons/close-icon.svg";

const { general, admin } = data;

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header>
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
          <Image src={menuIcon} alt="Menu icon" className="menu" />
        </button>
      </div>
      {toggleMenu && (
        <nav className="mobile-nav">
          <ul>
            {general.map(({ title, url }, index) => (
              <>
                <li key={index}>
                  <Link href={url} onClick={() => setToggleMenu(false)}>
                    {title}
                  </Link>
                </li>
                {index < general.length - 2 && <hr />}
              </>
            ))}
          </ul>
          <button onClick={() => setToggleMenu(false)}>
            <Image src={closeIcon} alt="Close menu icon" />
          </button>
        </nav>
      )}

      {/* desktop navigation */}
      <div className="desktop-header">
        <div>
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
          <nav>
            <ul className="flex gap-6">
              {general.map(({ title, url }, index) => (
                <li key={index}>
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
