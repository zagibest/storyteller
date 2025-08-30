import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { isValidLocale, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    en: {
      title: "Story-Capturers | Rural Life Stories",
      description:
        "A project documenting rural life in Mongolia, preserving stories of 'Rural People'. Writing family and friends' stories with 7 rural students from 7 provinces.",
      keywords: [
        "Mongolia",
        "rural",
        "stories",
        "storytelling",
        "rural life",
        "culture",
        "tradition",
      ],
      openGraph: {
        title: "Story-Capturers | Rural Life Stories",
        description:
          "A project documenting rural life in Mongolia, preserving stories of 'Rural People'",
        locale: "en_US",
      },
      twitter: {
        title: "Story-Capturers | Rural Life Stories",
        description:
          "A project documenting rural life in Mongolia, preserving stories of 'Rural People'",
      },
    },
    mn: {
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
      openGraph: {
        title: "Story-Capturers | Хөдөөний хүний түүх",
        description:
          "Монголын хөдөөний амьдралыг баримтлан, 'Хөдөөний хүн'-ийн түүхийг хадгалж үлдэх төсөл",
        locale: "mn_MN",
      },
      twitter: {
        title: "Story-Capturers | Хөдөөний хүний түүх",
        description:
          "Монголын хөдөөний амьдралыг баримтлан, 'Хөдөөний хүн'-ийн түүхийг хадгалж үлдэх төсөл",
      },
    },
  };

  const localeData = metadata[locale as Locale] || metadata.mn;

  return {
    title: localeData.title,
    description: localeData.description,
    keywords: localeData.keywords,
    authors: [{ name: "Story-Capturers Team" }],
    creator: "Story-Capturers",
    publisher: "Story-Capturers",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/apple-touch-icon.png", sizes: "180x180" },
        { url: "/site.webmanifest", sizes: "any" },
      ],
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    ),
    openGraph: {
      title: localeData.openGraph.title,
      description: localeData.openGraph.description,
      type: "website",
      locale: localeData.openGraph.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: localeData.twitter.title,
      description: localeData.twitter.description,
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "mn" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} font-manrope antialiased`}
      >
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
        <Toaster />
      </body>
    </html>
  );
}
