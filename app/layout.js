import { AuthProvider } from "./_context/auth-context";
import { LocationsProvider } from "@/app/_context/locations-context";
import Footer from "./_components/navigation/footer";
import Header from "./_components/navigation/header";
import "@/app/_styles/globals.scss";

export const metadata = {
  metadataBase: new URL("https://carevitafit.co.za"),
  description:
    "Our fitness programme is designed specifically by qualified trainers, physiotherapists and medical practitioners to ensure their safety for our senior members. These exercise programmes are led by certified fitness professionals that understand the unique challenges that come with ageing.",
  keywords:
    "#fit, CareVita, elderly fitness, wellbeing, elderly, retired, old people, care centre, retirement estate, fitness programme",
  openGraph: {
    description:
      "Our fitness programme is designed specifically by qualified trainers, physiotherapists and medical practitioners to ensure their safety for our senior members. These exercise programmes are led by certified fitness professionals that understand the unique challenges that come with ageing.",
    type: "website",
    locale: "en_ZA",
    siteName: "#fit - CareVita",
    keywords:
      "#fit, CareVita, elderly fitness, wellbeing, elderly, retired, old people, care centre, retirement estate, fitness programme",
    images: [
      {
        url: "",
      },
      {
        url: "",
      },
      {
        url: "",
      },
    ],
  },
};

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
