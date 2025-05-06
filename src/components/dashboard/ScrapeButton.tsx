
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Loader2, StopCircle } from "lucide-react";
import { useScrapingContext } from "@/context/ScrapingContext";

type ScrapeButtonProps = {
  onSuccess?: () => void;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "secondary";
};

export default function ScrapeButton({ 
  onSuccess, 
  size = "default", 
  variant = "default" 
}: ScrapeButtonProps) {
  const { status, startScraping, stopScraping } = useScrapingContext();
  const isRunning = status === 'running';
  
  const handleClick = async () => {
    if (isRunning) {
      await stopScraping();
    } else {
      await startScraping();
      if (onSuccess) onSuccess();
    }
  };

  return (
    <Button 
      onClick={handleClick} 
      disabled={status === 'completed' || status === 'failed'}
      size={size}
      variant={variant}
      className="flex items-center gap-2"
    >
      {isRunning ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Stop Scraping</span>
        </>
      ) : (
        <>
          <Play className="h-4 w-4" />
          <span>Start Scraping</span>
        </>
      )}
    </Button>
  );
}
