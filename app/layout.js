import "./globals.css";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-source-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://drsahiwellness.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dr. Sahi Psychology & Wellness | Supporting Minds. Strengthening Lives.",
    template: "%s | Dr. Sahi Psychology & Wellness",
  },
  description:
    "Dr. Sahithyaa Raghu - Counselling Psychologist & RCI-Licensed Therapist. Confidential psychological care for individuals, families, and workplaces. Bangalore & Chennai.",
  keywords: [
    "psychologist Bangalore",
    "counselling Chennai",
    "RCI licensed therapist",
    "individual counselling",
    "family counselling",
    "child psychologist",
    "online therapy India",
    "corporate mental health",
    "Dr. Sahithyaa Raghu",
    "wellness counselling",
  ],
  authors: [{ name: "Dr. Sahi Psychology & Wellness" }],
  creator: "Dr. Sahi Psychology & Wellness",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Dr. Sahi Psychology & Wellness",
    title: "Dr. Sahi Psychology & Wellness | Supporting Minds. Strengthening Lives.",
    description:
      "Dr. Sahithyaa Raghu - Counselling Psychologist & RCI-Licensed Therapist. Confidential psychological care for individuals, families, and workplaces. Bangalore & Chennai.",
    images: [
      {
        url: "/images/services/header.png",
        width: 1200,
        height: 630,
        alt: "Dr. Sahi Psychology & Wellness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Sahi Psychology & Wellness | Supporting Minds. Strengthening Lives.",
    description:
      "Dr. Sahithyaa Raghu - Counselling Psychologist & RCI-Licensed Therapist. Bangalore & Chennai.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add when you have them: google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Dr. Sahi Psychology & Wellness",
  description:
    "Dr. Sahithyaa Raghu - Counselling Psychologist & RCI-Licensed Therapist. Confidential psychological care for individuals, families, and workplaces in Bangalore and Chennai.",
  url: siteUrl,
  telephone: "+919962881006",
  email: "contact@drsahiwellness.com",
  areaServed: [
    { "@type": "City", name: "Bangalore" },
    { "@type": "City", name: "Chennai" },
    { "@type": "Country", name: "India" },
  ],
  priceRange: "By appointment",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [],
  image: `${siteUrl}/images/services/header.png`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${sourceSans.variable}`}>
      <head>
        <link rel="preload" href="/images/header_background_image.png" as="image" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
