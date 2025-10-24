import LayoutContent from "./client-layout";
import "@/_styles/globals.scss";

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
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
