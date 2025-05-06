
import { useState, useEffect } from "react";
import { BarChart, Database, Clock, AlertCircle } from "lucide-react";
import StatusCard from "@/components/dashboard/StatusCard";
import ProgressBar from "@/components/dashboard/ProgressBar";
import ScrapeButton from "@/components/dashboard/ScrapeButton";
import RecentFeeds from "@/components/dashboard/RecentFeeds";
import SideNav from "@/components/layout/SideNav";
import { apiService } from "@/lib/api-service";
import { DashboardStats } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { toast } = useToast();
  
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: apiService.getDashboardStats
  });
  
  // Handle successful scraping job start
  const handleScrapeSuccess = () => {
    toast({
      title: "Scraping job started",
      description: "Your scraping job has been started successfully"
    });
  };
  
  if (error) {
    toast({
      title: "Error loading dashboard",
      description: "Failed to load dashboard data. Please try refreshing.",
      variant: "destructive",
    });
  }
  
  return (
    <div className="flex h-screen bg-background">
      <SideNav />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <ScrapeButton onSuccess={handleScrapeSuccess} />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatusCard 
              title="Total Products" 
              value={stats?.totalProducts.toLocaleString() || "—"}
              change="+142 this week" 
              trend="up" 
              icon={<Database className="h-5 w-5" />} 
              loading={isLoading}
            />
            <StatusCard 
              title="Last Scrape" 
              value={stats?.lastScrapeTime || "—"}
              subtitle="ago" 
              icon={<Clock className="h-5 w-5" />} 
              loading={isLoading}
            />
            <StatusCard 
              title="Failed Products" 
              value={stats?.failedProducts.toString() || "—"}
              change="-3 from last run" 
              trend="down" 
              icon={<AlertCircle className="h-5 w-5" />} 
              loading={isLoading}
            />
            <StatusCard 
              title="Amazon Feed" 
              value={stats?.feedStatus || "—"}
              subtitle="9:32 AM"
              icon={<BarChart className="h-5 w-5" />} 
              loading={isLoading}
            />
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentFeeds />
            </div>
            <div className="lg:col-span-1 rounded-lg border bg-card p-6 space-y-6">
              <h2 className="text-lg font-medium mb-4">Scraping Progress</h2>
              <div className="space-y-4">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <ProgressBar 
                      key={i}
                      label="Loading..." 
                      value={0} 
                      showPercentage 
                      status="idle" 
                    />
                  ))
                ) : (
                  stats?.categoryProgress.map((category, index) => (
                    <ProgressBar 
                      key={index}
                      label={category.name} 
                      value={category.value} 
                      showPercentage 
                      status={category.status} 
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
