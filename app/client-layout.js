"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "../_context/auth-context";
import { LocationsProvider } from "@/_context/locations-context";
import Footer from "../_components/navigation/footer";
import Header from "../_components/navigation/header";

function LayoutContent({ children }) {
  const pathname = usePathname();

  // Reset scroll on every route change
  useEffect(() => {
    // Ensure scroll is always enabled when route changes
    document.body.style.overflow = "auto";
  }, [pathname]);

  // Initial mount safety net
  useEffect(() => {
    document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AuthProvider>
      <LocationsProvider>
        <Header />
        <div className="layout__outer">
          <div className="layout__inner">{children}</div>
        </div>
        <Footer />
      </LocationsProvider>
    </AuthProvider>
  );
}

export default LayoutContent;
