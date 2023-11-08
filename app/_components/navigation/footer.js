import Link from "next/link";

import ImageContainer from "@/app/_components/image-container";

import data from "@/app/_data/navigation-data.json";

const currentYear = new Date().getFullYear();

const { general, admin } = data;

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer__flex">
          <nav className="footer-nav">
            <ul className="footer-nav__list">
              {general.map(({ title, url }, index) => (
                <li className="footer-nav__list-item" key={index}>
                  <Link href={url}>{title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer__flex--logo">
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
            <p className="footer__flex--developed-by">
              Designed & developed by:
              <a href="https://www.thewrightdesigns.co.za" target="_blank">
                The Wright Designs
              </a>
            </p>
          </div>
          <hr className="footer__flex--line" />
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
