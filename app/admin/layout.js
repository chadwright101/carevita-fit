"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/app/_context/auth-context";
import { AdminGalleryProvider } from "@/app/_context/admin-gallery-context";

const AdminLayout = ({ children }) => {
  /* const { userUid } = useContext(AuthContext);

  if (userUid) {
    return (
      <AdminGalleryProvider>
        <section>{children}</section>
      </AdminGalleryProvider>
    );
  } else { */
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
  /* } */
};
export default AdminLayout;
