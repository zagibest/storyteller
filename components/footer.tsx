import { BookOpen, MapPin, Mountain, Users } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border/40 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center gap-8">
          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <Mountain className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-serif text-foreground font-bold">
                  Story-Capturers
                </h3>
                <p className="text-sm text-muted-foreground">
                  Хөдөөний хүний түүх
                </p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>7 түүхч</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>7 аймаг</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>∞ түүх</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 Story-Capturers. Бүх эрх хуулиар хамгаалагдсан.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
