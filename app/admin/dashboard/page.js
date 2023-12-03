"use client";

import { useState } from "react";

import Heading from "@/app/_components/heading";
import SecondaryGallerySection from "@/app/admin/dashboard/components/secondary-gallery-section";
import MainGallerySection from "@/app/admin/dashboard/components/main-gallery-section";
import TestimonialsSection from "@/app/admin/dashboard/components/testimonials-section";
import Image from "next/image";

const Dashboard = () => {
  const [switchGallery, setSwitchGallery] = useState(false);

  const handleSwitch = () => {
    setSwitchGallery(!switchGallery);
  };

  return (
    <main className="admin-page">
      <Heading pageHeading>Dashboard</Heading>
      <TestimonialsSection />
      <Heading subheading cssClasses="admin-page__galleries-heading">
        Galleries
      </Heading>
      <div className="admin-page__galleries-container">
        {switchGallery ? (
          <h4 className="admin-page__galleries-container__heading">
            Main gallery <span>(maximum 6 images)</span>
          </h4>
        ) : (
          <h4 className="admin-page__galleries-container__heading">
            Secondary gallery <span>(maximum 20 images)</span>
          </h4>
        )}
        <button
          type="button"
          className="admin-button"
          onClick={() => handleSwitch()}
        >
          {!switchGallery
            ? "Switch to Main Gallery"
            : "Switch to Secondary Gallery"}
          <Image
            src="/icons/swap.svg"
            alt="Swap gallery icon"
            width={35}
            height={35}
          />
        </button>
      </div>
      {switchGallery ? <MainGallerySection /> : <SecondaryGallerySection />}
    </main>
  );
};

export default Dashboard;
