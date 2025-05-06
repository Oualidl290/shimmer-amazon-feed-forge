
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  Settings, 
  FileText, 
  History,
  Database,
  Home,
  Play,
  Cog
} from "lucide-react";
import ScrapeButton from "../dashboard/ScrapeButton";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
};

const NavItem = ({ icon, label, href, active }: NavItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-brand-100 dark:hover:bg-brand-900",
      active && "bg-brand-100 text-brand-900 dark:bg-brand-900 dark:text-brand-100"
    )}
  >
    <div className={cn(
      "text-muted-foreground",
      active && "text-brand-700 dark:text-brand-300"
    )}>
      {icon}
    </div>
    <span>{label}</span>
  </Link>
);

export default function SideNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="hidden border-r bg-background lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="h-7 w-7 rounded-md bg-brand-600 flex items-center justify-center">
              <Database className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg">JewelryFeedForge</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium space-y-1">
            <NavItem
              active={currentPath === "/"}
              icon={<Home className="h-4 w-4" />}
              label="Dashboard"
              href="/"
            />
            <NavItem
              active={currentPath === "/config"}
              icon={<Cog className="h-4 w-4" />}
              label="Configuration"
              href="/config"
            />
            <NavItem
              active={currentPath === "/reports"}
              icon={<FileText className="h-4 w-4" />}
              label="Feed Reports"
              href="/reports"
            />
            <NavItem
              active={currentPath === "/history"}
              icon={<History className="h-4 w-4" />}
              label="Job History"
              href="/history"
            />
            <NavItem
              active={currentPath === "/settings"}
              icon={<Settings className="h-4 w-4" />}
              label="Settings"
              href="/settings"
            />
          </nav>
        </div>
        <div className="px-3 py-2">
          <ScrapeButton variant="default" />
        </div>
      </div>
    </div>
  );
}
