import Image from "next/image";
import Link from "next/link";

import navigation from "@/app/data/navigation-data.json";
import ImageContainer from "@/app/_components/_hooks/image-container";

import generalData from "@/app/data/general-data.json";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <nav>
            <ul>
              {navigation.general.map(({ title, url }, index) => (
                <li key={index}>
                  <Link href={url}>{title}</Link>
                </li>
              ))}
              <li>
                <Link href={generalData.social.facebook.url} target="_blank">
                  <Image
                    src="/carevita-fit-logo.jpg"
                    alt="Facebook logo"
                    width={35}
                    height={35}
                  />
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <Link href={generalData.social.facebook.url} target="_blank">
              <Image
                src="/carevita-fit-logo.jpg"
                alt="Facebook logo"
                width={45}
                height={45}
              />
            </Link>
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
            <p className="text-[16px] flex flex-col items-center tabletLarge:items-end tabletLarge:text-right tabletLarge:mt-2 tabletLarge:text-[15px]">
              Designed & developed by:
              <a href="https://www.thewrightdesigns.co.za" target="_blank">
                The Wright Designs
              </a>
            </p>
          </div>
        </div>
        <hr />
        <p>
          © CareVita {currentYear}
          <Link href="https://www.carevita.co.za">www.carevita.co.za</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
