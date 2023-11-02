import Link from "next/link";

import ImageContainer from "@/app/_components/image-container";

import navigation from "@/app/_data/navigation-data.json";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="desktop-flex">
          <nav>
            <ul>
              {navigation.map(({ title, url }, index) => (
                <li key={index}>
                  <Link href={url}>{title}</Link>
                </li>
              ))}
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
