import Link from "next/link";
import { Mountain, Users, BookOpen, MapPin } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <Mountain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif text-foreground font-bold">
                Story-Capturers
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Хөдөөний хүний түүх
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium flex items-center space-x-2 group"
            >
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Түүхүүд</span>
            </Link>
            <Link
              href="#storytellers"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium flex items-center space-x-2 group"
            >
              <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Түүхч нар</span>
            </Link>
            <Link
              href="#provinces"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium flex items-center space-x-2 group"
            >
              <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Аймгууд</span>
            </Link>
            <Link
              href="#about"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium flex items-center space-x-2 group"
            >
              <Mountain className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Бидний тухай</span>
            </Link>
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
