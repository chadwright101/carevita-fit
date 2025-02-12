"use client";

import { useContext, useState } from "react";
import dynamic from "next/dynamic";

import Heading from "@/app/_components/heading";
const SecondaryGallerySection = dynamic(
  () => import("@/app/admin/dashboard/components/secondary-gallery-section"),
  {
    ssr: false,
  }
);
const MainGallerySection = dynamic(
  () => import("@/app/admin/dashboard/components/main-gallery-section"),
  {
    ssr: false,
  }
);
const TestimonialsSection = dynamic(
  () => import("@/app/admin/dashboard/components/testimonials-section"),
  {
    ssr: false,
  }
);
import Image from "next/image";
import { AuthContext } from "@/app/_context/auth-context";

const Dashboard = () => {
  const [switchGallery, setSwitchGallery] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userUid } = useContext(AuthContext);

  const handleSwitch = () => {
    setSwitchGallery(!switchGallery);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 4000);
  };
  if (userUid) {
    return (
      <main className="admin-page">
        <Heading pageHeading>Dashboard</Heading>
        <Heading subheading cssClasses="admin-page__galleries-heading">
          Galleries
        </Heading>
        <div className="admin-page__galleries-container">
          {!switchGallery ? (
            <h4 className="admin-page__galleries-container__heading">
              Main gallery <span>(maximum 6 images)</span>
            </h4>
          ) : (
            <h4 className="admin-page__galleries-container__heading">
              Secondary gallery <span>(maximum 25 images)</span>
            </h4>
          )}
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <button
              type="button"
              className="admin-button"
              onClick={() => handleSwitch()}
            >
              {switchGallery
                ? "Switch to Main Gallery"
                : "Switch to Secondary Gallery"}
              <Image
                src="/icons/swap.svg"
                alt="Swap gallery icon"
                width={35}
                height={35}
              />
            </button>
          )}
        </div>
        {!switchGallery ? <MainGallerySection /> : <SecondaryGallerySection />}
        <TestimonialsSection />
      </main>
    );
  }
};

export default Dashboard;
