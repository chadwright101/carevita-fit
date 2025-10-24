"use client";

import { useContext, useState } from "react";

import Heading from "@/_components/heading";
import SecondaryGallerySection from "@/_components/user/dashboard/galleries/secondary-gallery-section";
import MainGallerySection from "@/_components/user/dashboard/galleries/main-gallery-section";
import TestimonialsSection from "@/_components/user/dashboard/testimonials/testimonials-section";
import Image from "next/image";
import { AuthContext } from "@/_context/auth-context";
import LocationsSection from "@/_components/user/dashboard/locations/locations-section";
import StaffSection from "@/_components/user/dashboard/staff/staff-section";

const Dashboard = () => {
  const [switchGallery, setSwitchGallery] = useState(false);
  const { userUid } = useContext(AuthContext);

  const handleSwitch = () => {
    setSwitchGallery(!switchGallery);
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
        </div>
        {!switchGallery ? <MainGallerySection /> : <SecondaryGallerySection />}
        <LocationsSection />
        <StaffSection />
        <TestimonialsSection />
      </main>
    );
  }
};

export default Dashboard;
