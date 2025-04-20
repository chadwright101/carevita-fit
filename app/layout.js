import { AuthProvider } from "../_context/auth-context";
import { LocationsProvider } from "@/_context/locations-context";
import Footer from "../_components/navigation/footer";
import Header from "../_components/navigation/header";
import "@/_styles/globals.scss";
import "@/_styles/tailwind.css";

export const metadata = {
  metadataBase: new URL("https://carevitafit.co.za"),
  description:
    "At CareVita #fit, our fitness programme is designed specifically by qualified trainers, physiotherapists and medical practitioners to ensure the safety of the elderly. They include a variety of exercises that are safe, effective and fun. Our main focus is on strength, flexibility and balance.",
  keywords:
    "#fit, CareVita, elderly fitness, wellbeing, elderly, retired, old people, senior citizens, care centre, retirement estate, fitness programme",
  openGraph: {
    description:
      "At CareVita #fit, our fitness programme is designed specifically by qualified trainers, physiotherapists and medical practitioners to ensure the safety of the elderly. They include a variety of exercises that are safe, effective and fun. Our main focus is on strength, flexibility and balance.",
    type: "website",
    locale: "en_ZA",
    siteName: "#fit - CareVita",
    keywords:
      "#fit, CareVita, elderly fitness, wellbeing, elderly, retired, old people, senior citizens, care centre, retirement estate, fitness programme",
    images: [
      {
        url: "/images/general/meta-image.webp",
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
