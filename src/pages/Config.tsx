
import SideNav from "@/components/layout/SideNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Config() {
  const [config, setConfig] = useState({
    supplierUrl: "https://jewelry-supplier.com",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
    scrapeInterval: "daily",
    maxConcurrency: 5,
    timeout: 30000,
    exportFormat: "xlsx"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the configuration
    console.log("Saving config:", config);
  };

  return (
    <div className="flex h-screen bg-background">
      <SideNav />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Configuration</h1>
          
          <div className="rounded-lg border bg-card p-6">
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
                <Button type="submit">Save Configuration</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
