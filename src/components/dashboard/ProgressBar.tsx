
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  label?: string;
  max?: number;
  className?: string;
  indicatorClassName?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  status?: "idle" | "running" | "completed" | "failed";
};

export default function ProgressBar({
  value,
  label,
  max = 100,
  className,
  indicatorClassName,
  showPercentage = false,
  size = "md",
  status = "idle"
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);
  
  // Status-based colors
  const getStatusColor = () => {
    switch (status) {
      case "running": return "bg-amber-500";
      case "completed": return "bg-emerald-500";
      case "failed": return "bg-red-500";
      default: return "bg-brand-500";
    }
  };
  
  // Size-based height
  const getHeight = () => {
    switch (size) {
      case "sm": return "h-1";
      case "lg": return "h-3";
      default: return "h-2";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          {showPercentage && <span className="font-medium">{percentage}%</span>}
        </div>
      )}
      <div className={cn("w-full overflow-hidden rounded-full bg-muted", getHeight())}>
        <div
          className={cn("h-full transition-all duration-300 ease-in-out", getStatusColor(), indicatorClassName)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
