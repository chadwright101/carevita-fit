import { AuthProvider } from "./_context/auth-context";
import { LocationsProvider } from "@/app/_context/locations-context";
import Footer from "./_components/navigation/footer";
import Header from "./_components/navigation/header";

import "@/app/_styles/globals.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <LocationsProvider>
            <div className="layout-outer">
              <div className="layout-inner">{children}</div>
            </div>
          </LocationsProvider>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
