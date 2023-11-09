"use client";

import Link from "next/link";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/app/_context/auth-context";
import { logoutUser } from "@/app/_firebase/firebase";
import { AdminProvider } from "../_context/admin-contect";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const handleSignOut = async (e) => {
    logoutUser();
    router.push("/login");
    setLoggedInUser(false);
    localStorage.removeItem("loggedInUser");
  };

  useEffect(() => {
    const handlePageHide = (e) => {
      e.preventDefault();
      handleSignOut();
    };

    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [handleSignOut]);

  if (loggedInUser) {
    return (
      <AdminProvider>
        <section>{children}</section>
      </AdminProvider>
    );
  } else {
    return (
      <section>
        <h2>You need to be logged in to view this page</h2>
        <Link href="/login">Login</Link>
      </section>
    );
  }
};
export default AdminLayout;
