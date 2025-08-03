"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-destructive/10 rounded-full mb-6">
              <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Something Went Wrong
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We encountered an unexpected error while loading your story. Don't
              worry, it's not your fault!
            </p>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-6 p-4 bg-muted rounded-lg text-left">
                <p className="text-sm font-mono text-muted-foreground">
                  Error: {error.message}
                </p>
                {error.digest && (
                  <p className="text-sm font-mono text-muted-foreground mt-2">
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={reset}
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </Link>
          </div>

          {/* Additional Help */}
          <div className="text-sm text-muted-foreground">
            <p>
              If this problem persists, please contact support or try refreshing
              the page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
