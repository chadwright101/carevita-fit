"use client";

import { useState } from "react";

import Heading from "@/app/_components/heading";
import GallerySection from "@/app/_components/pages/admin/gallery-section";
import HeroSection from "@/app/_components/pages/admin/hero-section";
import TestimonialsSection from "@/app/_components/pages/admin/testimonials-section";

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
      <button
        type="button"
        className="admin-button admin-page__switch-button"
        onClick={() => handleSwitch()}
      >
        Switch gallery
      </button>
      {switchGallery ? <HeroSection /> : <GallerySection />}
    </main>
  );
};

export default Dashboard;
