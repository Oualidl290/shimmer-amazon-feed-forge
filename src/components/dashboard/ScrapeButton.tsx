
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/lib/api-service";

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
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleScrape = async () => {
    setIsLoading(true);
    
    try {
      // Call the API to start a scraping job
      const job = await apiService.startScrapeJob();
      
      toast({
        title: "Scraping started successfully",
        description: "You'll be notified when the process completes",
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Failed to start scraping",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleScrape} 
      disabled={isLoading}
      size={size}
      variant={variant}
      className="flex items-center gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Play className="h-4 w-4" />
      )}
      {isLoading ? "Starting..." : "Start Scraping"}
    </Button>
  );
}
