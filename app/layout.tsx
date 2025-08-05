import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Story-Capturers | Хөдөөний хүний түүх",
  description:
    "Монголын хөдөөний амьдралыг баримтлан, 'Хөдөөний хүн'-ийн түүхийг хадгалж үлдэх төсөл. 7 аймгийн 7 хөдөөний сурагчдын хамт өөрсдийн гэр бүл, найз нөхдийнхөө түүхийг бичиж байна.",
  keywords: [
    "Монгол",
    "хөдөө",
    "түүх",
    "storytelling",
    "rural life",
    "Mongolia",
    "culture",
    "tradition",
  ],
  authors: [{ name: "Story-Capturers Team" }],
  creator: "Story-Capturers",
  publisher: "Story-Capturers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "Story-Capturers | Хөдөөний хүний түүх",
    description:
      "Монголын хөдөөний амьдралыг баримтлан, 'Хөдөөний хүн'-ийн түүхийг хадгалж үлдэх төсөл",
    type: "website",
    locale: "mn_MN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Story-Capturers | Хөдөөний хүний түүх",
    description:
      "Монголын хөдөөний амьдралыг баримтлан, 'Хөдөөний хүн'-ийн түүхийг хадгалж үлдэх төсөл",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} font-manrope antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
