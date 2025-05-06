
import { cn } from "@/lib/utils";

type StatusCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  change?: string;
  trend?: "up" | "down" | "neutral";
};

export default function StatusCard({ 
  title, 
  value, 
  subtitle, 
  className, 
  loading = false,
  icon,
  change,
  trend
}: StatusCardProps) {
  return (
    <div className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm p-6",
      loading && "animate-pulse",
      className
    )}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-end space-x-1">
            <h2 className="text-2xl font-bold tracking-tight">
              {loading ? "..." : value}
            </h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground pb-1">{subtitle}</p>
            )}
          </div>
          {change && (
            <p className={cn(
              "text-xs mt-1",
              trend === "up" ? "text-emerald-500" : 
              trend === "down" ? "text-red-500" : 
              "text-muted-foreground"
            )}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-brand-500">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
