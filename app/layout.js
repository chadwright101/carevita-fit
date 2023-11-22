import { AuthProvider } from "./_context/auth-context";
import { LocationsProvider } from "@/app/_context/locations-context";
import Footer from "./_components/navigation/footer";
import Header from "./_components/navigation/header";
import "@/app/_styles/globals.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="layout">
        <AuthProvider>
          <LocationsProvider>
            <Header />
            <div className="layout__outer">
              <div className="layout__inner">{children}</div>
            </div>
            <Footer />
          </LocationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
