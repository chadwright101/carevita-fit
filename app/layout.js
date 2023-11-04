import { LocationsProvider } from "@/app/_context/locations-context";
import Footer from "./_components/navigation/footer";
import Header from "./_components/navigation/header";

import "@/app/_styles/globals.scss";
import { AuthProvider } from "./_context/auth-context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <AuthProvider>
          <LocationsProvider>
            <div className="layout-outer">
              <div className="layout-inner">{children}</div>
            </div>
          </LocationsProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
