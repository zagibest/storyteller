"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type ReadingProgressProps = {
  targetSelector?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export function ReadingProgress({
  targetSelector,
  className,
  orientation = "horizontal",
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target: HTMLElement | Window | null = targetSelector
      ? (document.querySelector(targetSelector) as HTMLElement | null)
      : window;

    const calculateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const doc = document.documentElement;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const newProgress =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, newProgress)));
    };

    calculateProgress();
    window.addEventListener("scroll", calculateProgress, { passive: true });
    window.addEventListener("resize", calculateProgress);

    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
    };
  }, [targetSelector]);

  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "relative h-40 w-1.5 rounded-full bg-border/60 overflow-hidden md:h-64",
          className
        )}
        aria-hidden
      >
        <div
          className="absolute bottom-0 left-0 w-full bg-primary/80 transition-[height] duration-150 ease-linear"
          style={{ height: `${progress}%` }}
        />
      </div>
    );
  }

  return (
    <div className={className} aria-hidden>
      <div
        className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="h-full origin-left bg-gradient-to-r from-primary/80 via-primary to-primary/80 transition-[width] duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
