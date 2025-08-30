"use client";

import { getLocalePath, type Locale } from "@/lib/i18n";
import { BookOpen, Mountain, PhoneCall, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./language-switcher";
import TrueFocus from "./TrueFocus/TrueFocus";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

interface HeaderProps {
  locale: Locale;
}

const Header = ({ locale }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      className={`fixed top-4 right-1/2 translate-x-1/2 transform z-50 rounded-xl transition-all duration-300 ease-in-out w-[95%] ${
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
              src="/logo.png"
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

          <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <DrawerTrigger asChild>
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
            </DrawerTrigger>
            <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[70vh]">
              <DrawerHeader className="border-b">
                <div className="flex items-center justify-between">
                  <DrawerTitle className="text-xl font-bold">
                    {locale === "en" ? "Navigation" : "Цэс"}
                  </DrawerTitle>
                  <DrawerClose asChild>
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </DrawerClose>
                </div>
              </DrawerHeader>
              <div className="p-4 space-y-4">
                <DrawerClose asChild>
                  <Link
                    href={getLocalePath(locale)}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <BookOpen className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
                    <span className="text-lg font-medium">{nav.stories}</span>
                  </Link>
                </DrawerClose>

                <DrawerClose asChild>
                  <Link
                    href={getLocalePath(locale, "about")}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <Mountain className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
                    <span className="text-lg font-medium">{nav.about}</span>
                  </Link>
                </DrawerClose>

                <DrawerClose asChild>
                  <Link
                    href={getLocalePath(locale, "contact")}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <PhoneCall className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
                    <span className="text-lg font-medium">{nav.contact}</span>
                  </Link>
                </DrawerClose>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-center">
                    <LanguageSwitcher currentLocale={locale} />
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
