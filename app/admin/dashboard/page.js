"use client";

import { useContext, useEffect } from "react";

import { useRouter } from "next/navigation";
import Heading from "@/app/_components/heading";
import { logoutUser } from "@/app/_firebase/firebase";
import { AuthContext } from "@/app/_context/auth-context";

const Dashboard = () => {
  const router = useRouter();
  const { setLoggedInUser } = useContext(AuthContext);

  const handleSignOut = async (e) => {
    logoutUser();
    router.push("/login");
    setLoggedInUser(false);
    localStorage.removeItem("loggedInUser");
  };

  useEffect(() => {
    const timeout = setTimeout(handleSignOut, 60 * 60 * 1000); // 1 hour

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main>
      <Heading pageHeading>Dashboard</Heading>
      <Heading subheading>Welcome Julie</Heading>
      <button onClick={handleSignOut}>Sign Out</button>
    </main>
  );
};

export default Dashboard;
