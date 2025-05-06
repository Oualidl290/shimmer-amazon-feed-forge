
import { BarChart, Database, Clock, AlertCircle } from "lucide-react";
import StatusCard from "@/components/dashboard/StatusCard";
import ProgressBar from "@/components/dashboard/ProgressBar";
import ScrapeButton from "@/components/dashboard/ScrapeButton";
import RecentFeeds from "@/components/dashboard/RecentFeeds";
import SideNav from "@/components/layout/SideNav";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <SideNav />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <ScrapeButton />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatusCard 
              title="Total Products" 
              value="6,248" 
              change="+142 this week" 
              trend="up" 
              icon={<Database className="h-5 w-5" />} 
            />
            <StatusCard 
              title="Last Scrape" 
              value="32 min" 
              subtitle="ago" 
              icon={<Clock className="h-5 w-5" />} 
            />
            <StatusCard 
              title="Failed Products" 
              value="18" 
              change="-3 from last run" 
              trend="down" 
              icon={<AlertCircle className="h-5 w-5" />} 
            />
            <StatusCard 
              title="Amazon Feed" 
              value="Ready" 
              subtitle="9:32 AM"
              icon={<BarChart className="h-5 w-5" />} 
            />
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentFeeds />
            </div>
            <div className="lg:col-span-1 rounded-lg border bg-card p-6 space-y-6">
              <h2 className="text-lg font-medium mb-4">Scraping Progress</h2>
              <div className="space-y-4">
                <ProgressBar 
                  label="Necklaces" 
                  value={100} 
                  showPercentage 
                  status="completed" 
                />
                <ProgressBar 
                  label="Earrings" 
                  value={100} 
                  showPercentage 
                  status="completed" 
                />
                <ProgressBar 
                  label="Rings" 
                  value={84} 
                  showPercentage 
                  status="running" 
                />
                <ProgressBar 
                  label="Bracelets" 
                  value={0} 
                  showPercentage 
                  status="idle" 
                />
                <ProgressBar 
                  label="Pendants" 
                  value={0} 
                  showPercentage 
                  status="idle" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
