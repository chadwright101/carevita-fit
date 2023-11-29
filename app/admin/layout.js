"use client";

import Link from "next/link";
import { useContext } from "react";

import { AuthContext } from "@/app/_context/auth-context";
import { AdminTestimonialProvider } from "@/app/_context/admin-testimonial-context";
import { AdminGalleryProvider } from "@/app/_context/admin-gallery-context";

const AdminLayout = ({ children }) => {
  const { loggedInUser } = useContext(AuthContext);

  if (loggedInUser) {
    return (
      <AdminGalleryProvider>
        <AdminTestimonialProvider>
          <section>{children}</section>
        </AdminTestimonialProvider>
      </AdminGalleryProvider>
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
