"use client";

import { type Dictionary } from "@/lib/dictionaries";
import { getLocalePath, type Locale } from "@/lib/i18n";
import { BookOpen, Mountain, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./language-switcher";
import TrueFocus from "./TrueFocus/TrueFocus";

interface HeaderProps {
  locale: Locale;
  dict?: Dictionary;
}

const Header = ({ locale, dict }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = {
    en: {
      stories: "Stories",
      storytellers: "Storytellers",
      provinces: "Provinces",
      about: "About Us",
      story: "Story",
      tellers: "Tellers",
      contact: "Contact Us",
    },
    mn: {
      stories: "Түүхүүд",
      storytellers: "Түүхч нар",
      provinces: "Аймгууд",
      about: "Бидний тухай",
      story: "Түүх",
      tellers: "Өгүүлэгчид",
      contact: "Холбогдох",
    },
  };

  const nav = navigationItems[locale] || navigationItems.mn;

  return (
    <header
      className={`fixed top-4 right-1/2 translate-x-1/2 transform z-50 rounded-xl transition-all duration-300 ease-in-out w-full ${
        isScrolled
          ? "border border-border/40 bg-card/50 backdrop-blur-sm max-w-screen-xl"
          : "bg-transparent max-w-screen-2xl"
      }`}
    >
      <div className="mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link
            href={getLocalePath(locale)}
            className="flex items-center space-x-3 group"
          >
            <Image
              src="/logo_square.png"
              alt="Story Capturers"
              width={50}
              height={50}
            />

            <div className="flex flex-col">
              <TrueFocus
                sentence={
                  locale === "en" ? "Story Capturers" : "Түүх өгүүлэгчид"
                }
                manualMode={false}
                blurAmount={2}
                borderColor="orange"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={getLocalePath(locale)}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium flex items-center space-x-2 group"
            >
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{nav.stories}</span>
            </Link>

            <Link
              href={getLocalePath(locale, "about")}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium flex items-center space-x-2 group"
            >
              <Mountain className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{nav.about}</span>
            </Link>
            <Link
              href={getLocalePath(locale, "contact")}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium flex items-center space-x-2 group"
            >
              <PhoneCall className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{nav.contact}</span>
            </Link>
            <LanguageSwitcher currentLocale={locale} />
          </nav>

          <button className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors">
            <svg
              className="w-6 h-6 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
