
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  label?: string;
  max?: number;
  className?: string;
  indicatorClassName?: string;
  showPercentage?: boolean;
};

export default function ProgressBar({
  value,
  label,
  max = 100,
  className,
  indicatorClassName,
  showPercentage = false
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between text-sm">
          <span>{label}</span>
          {showPercentage && <span>{percentage}%</span>}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full bg-brand-500", indicatorClassName)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
