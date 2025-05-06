
import { useState, useEffect } from "react";
import SideNav from "@/components/layout/SideNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiService } from "@/lib/api-service";
import { ScrapingConfig } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

export default function Config() {
  const { toast } = useToast();
  const [config, setConfig] = useState<ScrapingConfig>({
    supplierUrl: "",
    userAgent: "",
    scrapeInterval: "daily",
    maxConcurrency: 5,
    timeout: 30000,
    exportFormat: "xlsx"
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  const { data: configData, isLoading, error } = useQuery({
    queryKey: ['config'],
    queryFn: apiService.getConfig
  });

  // Use useEffect to update the state when data is fetched
  useEffect(() => {
    if (configData) {
      setConfig(configData);
    }
  }, [configData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const updatedConfig = await apiService.updateConfig(config);
      setConfig(updatedConfig);
      toast({
        title: "Configuration saved",
        description: "Your scraper configuration has been updated"
      });
    } catch (error) {
      toast({
        title: "Failed to save configuration",
        description: "There was an error saving your configuration.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <SideNav />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Configuration</h1>
          
          <div className="rounded-lg border bg-card p-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <p>Loading configuration...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="supplierUrl">Supplier URL</Label>
                  <Input 
                    id="supplierUrl"
                    value={config.supplierUrl}
                    onChange={(e) => setConfig({...config, supplierUrl: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="userAgent">User Agent</Label>
                  <Input 
                    id="userAgent"
                    value={config.userAgent}
                    onChange={(e) => setConfig({...config, userAgent: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="scrapeInterval">Scrape Interval</Label>
                    <select 
                      id="scrapeInterval"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      value={config.scrapeInterval}
                      onChange={(e) => setConfig({...config, scrapeInterval: e.target.value})}
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxConcurrency">Max Concurrency</Label>
                    <Input 
                      id="maxConcurrency"
                      type="number"
                      value={config.maxConcurrency}
                      onChange={(e) => setConfig({...config, maxConcurrency: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeout">Timeout (ms)</Label>
                    <Input 
                      id="timeout"
                      type="number"
                      value={config.timeout}
                      onChange={(e) => setConfig({...config, timeout: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="exportFormat">Export Format</Label>
                  <select 
                    id="exportFormat"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={config.exportFormat}
                    onChange={(e) => setConfig({...config, exportFormat: e.target.value})}
                  >
                    <option value="xlsx">Excel (XLSX)</option>
                    <option value="csv">CSV</option>
                    <option value="json">JSON</option>
                  </select>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Configuration"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
