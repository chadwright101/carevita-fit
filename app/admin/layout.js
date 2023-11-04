"use client";

import { useContext } from "react";
import { AuthContext } from "@/app/_context/auth-context";
import Link from "next/link";

const AdminLayout = ({ children }) => {
  const { loggedInUser } = useContext(AuthContext);
  if (loggedInUser) {
    return <section>{children}</section>;
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
