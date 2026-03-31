import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

interface LoadingSpinnerProps {
  value?: number;
  minProgress?: number;
  maxProgress?: number;

  color?: string;
  trackColor?: string;

  showLabel?: boolean;

  animated?: boolean;
  duration?: number;

  indeterminate?: boolean;

  className?: string;
}

export function LoadingSpinner({
  value = 0,
  minProgress = 0,
  maxProgress = 100,

  color = "#ec4899",
  trackColor = "#fbcfe8",

  showLabel = true,

  animated = true,
  duration = 800,

  indeterminate = false,

  className = "",
}: LoadingSpinnerProps) {
  const [animatedValue, setAnimatedValue] = useState(minProgress);
  const [angle, setAngle] = useState(0);

  // progress normal
  useEffect(() => {
    if (indeterminate) return;

    if (!animated) {
      setAnimatedValue(value);
      return;
    }

    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;

      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);

      const current = minProgress + (value - minProgress) * percent;

      setAnimatedValue(current);

      if (percent < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value, duration, animated, minProgress, indeterminate]);

  // spinner real
  useEffect(() => {
    if (!indeterminate) return;

    let frame: number;

    const spin = () => {
      setAngle((prev) => (prev + 4) % 360);
      frame = requestAnimationFrame(spin);
    };

    frame = requestAnimationFrame(spin);

    return () => cancelAnimationFrame(frame);
  }, [indeterminate]);

  const percentage =
    ((animatedValue - minProgress) / (maxProgress - minProgress)) * 100;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center aspect-square",
        className,
      )}
    >
      {!indeterminate && (
        <progress
          value={value}
          min={minProgress}
          max={maxProgress}
          className="sr-only"
        />
      )}

      <div
        className="w-full h-full rounded-full flex items-center justify-center"
        style={{
          background: indeterminate
            ? `
              radial-gradient(closest-side, white 75%, transparent 76%),
              conic-gradient(
                from ${angle}deg,
                ${color} 20%,
                ${trackColor} 0
              )
            `
            : `
              radial-gradient(closest-side, white 75%, transparent 76%),
              conic-gradient(
                ${color} ${percentage}%,
                ${trackColor} 0
              )
            `,
        }}
      >
        {!indeterminate && showLabel && (
          <span className="text-sm font-semibold">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
}
