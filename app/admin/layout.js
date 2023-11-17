"use client";

import Link from "next/link";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/app/_context/auth-context";
import { logoutUser } from "@/app/_firebase/auth";
import { TestimonialProvider } from "@/app/_context/testimonial-context";
import { HeroGalleryProvider } from "../_context/hero-gallery-context";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  useEffect(() => {
    const handleSignOut = async (e) => {
      logoutUser();
      router.push("/login");
      setLoggedInUser(false);
      localStorage.removeItem("loggedInUser");
    };

    const handlePageHide = (e) => {
      e.preventDefault();
      handleSignOut();
    };

    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  if (loggedInUser) {
    return (
      <HeroGalleryProvider>
        <TestimonialProvider>
          <section>{children}</section>
        </TestimonialProvider>
      </HeroGalleryProvider>
    );
  } else {
    return (
      <section className="admin-layout">
        <h2 className="admin-layout__heading">
          You need to be logged in to view this page...
        </h2>
        <Link className="admin-layout__link admin-button" href="/login">
          Login here
        </Link>
      </section>
    );
  }
};
export default AdminLayout;
