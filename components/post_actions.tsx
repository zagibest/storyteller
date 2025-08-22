"use client";

import { Button } from "@/components/ui/button";
import { Check, Share2 } from "lucide-react";
import { useState } from "react";

type PostActionsProps = {
  title: string;
  url: string;
  orientation?: "horizontal" | "vertical";
};

export function PostActions({
  title,
  url,
  orientation = "horizontal",
}: PostActionsProps) {
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url,
        });
        setShared(true);
        setTimeout(() => setShared(false), 1500);
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 1500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={
        orientation === "vertical"
          ? "flex flex-col items-stretch gap-2"
          : "flex items-center gap-2"
      }
    >
      <Button variant="outline" size="sm" onClick={handleShare}>
        {shared ? <Check className="text-emerald-500" /> : <Share2 />}
        <span className="hidden sm:inline">Share</span>
      </Button>
    </div>
  );
}
