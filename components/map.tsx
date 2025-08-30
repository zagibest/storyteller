"use client";

import { useEffect, useRef } from "react";

interface MongoliaDotMapProps {
  dotSize?: number;
  dotSpacing?: number;
  dotColor?: string;
  className?: string;
}

export default function MongoliaDotMap({
  dotSize = 3,
  dotSpacing = 8,
  dotColor = "#3b82f6",
  className = "",
}: MongoliaDotMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing dots
    container.innerHTML = "";

    const containerWidth = 600;
    const containerHeight = 400;

    // Calculate number of dots based on spacing
    const dotsX = Math.floor(containerWidth / dotSpacing);
    const dotsY = Math.floor(containerHeight / dotSpacing);

    const dotsGrid: HTMLDivElement[][] = [];

    // Create dots
    for (let y = 0; y < dotsY; y++) {
      dotsGrid[y] = [];
      for (let x = 0; x < dotsX; x++) {
        const dot = document.createElement("div");
        dot.style.position = "absolute";
        dot.style.width = `${dotSize}px`;
        dot.style.height = `${dotSize}px`;
        dot.style.backgroundColor = dotColor;
        dot.style.borderRadius = "50%";
        dot.style.left = `${x * dotSpacing}px`;
        dot.style.top = `${y * dotSpacing}px`;
        dot.style.transition = "all 0.2s ease-out";
        dot.style.cursor = "pointer";
        dot.style.transformOrigin = "center";

        dotsGrid[y][x] = dot;
        dot.dataset.x = x.toString();
        dot.dataset.y = y.toString();

        container.appendChild(dot);
      }
    }

    const applyHoverEffect = (
      centerX: number,
      centerY: number,
      isHovering: boolean
    ) => {
      const radius = 3; // Affect dots within 3 positions in each direction

      for (
        let y = Math.max(0, centerY - radius);
        y <= Math.min(dotsY - 1, centerY + radius);
        y++
      ) {
        for (
          let x = Math.max(0, centerX - radius);
          x <= Math.min(dotsX - 1, centerX + radius);
          x++
        ) {
          const dot = dotsGrid[y][x];
          if (!dot) continue;

          // Calculate distance from center
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

          if (distance <= radius) {
            // Scale effect based on distance (closer dots scale more)
            const scale = isHovering ? Math.max(1.5, 3 - distance * 0.5) : 1;
            const opacity = isHovering ? Math.max(0.6, 1 - distance * 0.1) : 1;

            dot.style.transform = `scale(${scale})`;
            dot.style.backgroundColor = isHovering ? "#ef4444" : dotColor;
            dot.style.boxShadow = isHovering
              ? `0 0 ${10 + distance * 2}px rgba(239, 68, 68, ${opacity * 0.5})`
              : "none";
            dot.style.zIndex = isHovering ? "10" : "1";
          }
        }
      }
    };

    dotsGrid.forEach((row, y) => {
      row.forEach((dot, x) => {
        dot.addEventListener("mouseenter", () => {
          applyHoverEffect(x, y, true);
        });

        dot.addEventListener("mouseleave", () => {
          applyHoverEffect(x, y, false);
        });
      });
    });
  }, [dotSize, dotSpacing, dotColor]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="relative"
        style={{
          width: "100%",
          // height: "400px",
          maskImage: "url(/mn-03.png)",
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskImage: "url(/mn-03.png)",
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          aspectRatio: "16/9",
        }}
      />
    </div>
  );
}
