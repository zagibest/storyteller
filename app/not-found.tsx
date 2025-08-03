import { Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-serif font-bold text-muted-foreground/20 leading-none">
              404
            </h1>
          </div>

          {/* Main Message */}
          <div className="space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Page Not Found
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved to another realm.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <Search className="w-4 h-4" />
              <span>Browse Stories</span>
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
