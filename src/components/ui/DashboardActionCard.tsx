import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

type DashboardActionCardProps = {
  title: string;
  description?: string;
  to: string;
  icon?: ReactNode;
  className?: string;
};

export function DashboardActionCard({
  title,
  description,
  to,
  icon,
  className,
}: DashboardActionCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col gap-2 rounded-3xl border-2 border-border bg-surface p-6 shadow-sm transition",
        "hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
    >
      {icon ? <div className="text-primary">{icon}</div> : null}
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      {description ? (
        <p className="text-sm text-text-muted">{description}</p>
      ) : null}
    </Link>
  );
}
