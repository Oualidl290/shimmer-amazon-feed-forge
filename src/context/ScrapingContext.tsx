
import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiService } from '@/lib/api-service';
import { useToast } from '@/hooks/use-toast';

type ScrapingStatus = 'idle' | 'running' | 'completed' | 'failed';

interface ScrapingContextType {
  status: ScrapingStatus;
  progress: number;
  currentCategory: string;
  startScraping: () => Promise<void>;
  stopScraping: () => Promise<void>;
}

const ScrapingContext = createContext<ScrapingContextType | undefined>(undefined);

export function ScrapingProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<ScrapingStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('');
  const { toast } = useToast();
  
  // Poll for status updates when scraping is running
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (status === 'running') {
      interval = setInterval(async () => {
        try {
          const statusData = await apiService.getScrapingStatus();
          setProgress(statusData.progress);
          setCurrentCategory(statusData.currentCategory);
          
          if (statusData.status !== 'running') {
            setStatus(statusData.status);
            clearInterval(interval);
            
            if (statusData.status === 'completed') {
              toast({
                title: "Scraping completed",
                description: `Successfully scraped ${statusData.totalProducts} products`
              });
            } else if (statusData.status === 'failed') {
              toast({
                title: "Scraping failed",
                description: "There was an error during the scraping process",
                variant: "destructive"
              });
            }
          }
        } catch (error) {
          console.error("Error fetching scraping status:", error);
        }
      }, 2000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, toast]);
  
  const startScraping = async () => {
    try {
      await apiService.startScrapeJob();
      setStatus('running');
      setProgress(0);
      toast({
        title: "Scraping started",
        description: "The scraping process has begun"
      });
    } catch (error) {
      toast({
        title: "Failed to start scraping",
        description: "There was an error starting the scraping process",
        variant: "destructive"
      });
    }
  };
  
  const stopScraping = async () => {
    try {
      await apiService.stopScrapeJob();
      setStatus('idle');
      toast({
        title: "Scraping stopped",
        description: "The scraping process has been stopped"
      });
    } catch (error) {
      toast({
        title: "Failed to stop scraping",
        description: "There was an error stopping the scraping process",
        variant: "destructive"
      });
    }
  };
  
  return (
    <ScrapingContext.Provider 
      value={{ 
        status, 
        progress, 
        currentCategory, 
        startScraping,
        stopScraping 
      }}
    >
      {children}
    </ScrapingContext.Provider>
  );
}

export const useScrapingContext = () => {
  const context = useContext(ScrapingContext);
  if (context === undefined) {
    throw new Error('useScrapingContext must be used within a ScrapingProvider');
  }
  return context;
};
