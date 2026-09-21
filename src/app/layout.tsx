import type { Metadata } from "next";
import localFont from "next/font/local";
import { Tillana } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackTop from "@/components/BackTop";
import { VisitTracker } from "@/components/VisitTracker";
import { getSiteUrl } from "@/lib/site";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const tillana = Tillana({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-tillana",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "I am a Senior AI Full-Stack Engineer",
  description:
    "I am a Senior AI Full-Stack Engineer specializing in scalable systems, blockchain, web, and AI.",
  keywords: [
    "software engineer",
    "scalable systems",
    "efficient systems",
    "Blockchain Developer",
    "Web Developer",
    "AI Developer",
    "Full Stack Developer",
  ],
  robots: "index, follow",
  openGraph: {
    title: "I am a Senior AI Full-Stack Engineer",
    description:
      "I am a Senior AI Full-Stack Engineer specializing in scalable systems, blockchain, web, and AI.",
    url: siteUrl,
    type: "website",
    images: [
      {
        url: "/assets/banner.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Banner",
      },
    ],
    siteName: "Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ChiKit",
    title: "I am a Senior AI Full-Stack Engineer",
    description:
      "I am a Senior AI Full-Stack Engineer specializing in scalable systems, blockchain, web, and AI.",
    images: ["/assets/banner.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  jobTitle: "Senior AI Full-Stack Engineer",
  url: siteUrl,
  sameAs: ["https://github.com/fdev-tobi"],
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tillana.variable} antialiased w-screen overflow-x-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <VisitTracker />
        <Header />
        {children}
        <Footer />
        <BackTop />
      </body>
    </html>
  );
};

export default AppLayout;
