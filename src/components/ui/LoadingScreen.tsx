import { GradientBackdrop } from "@/components/layout/GradientBackdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingScreenProps {
  title?: string;
  description?: string;
  loadingSpinner?: boolean;
}
export function LoadingScreen({
  title = "Carregando…",
  description = "",
  loadingSpinner = true,
}: LoadingScreenProps) {
  return (
    <div className="relative flex flex-col size-full min-h-screen items-center justify-center gap-4">
      <GradientBackdrop />

      {loadingSpinner && (
        <CircularProgress size="4rem" style={{ color: "var(--color-light)" }} />
      )}

      <p className="relative z-10 text-light text-3xl font-medium">{title}</p>

      {description && (
        <p className="relative z-10 text-light text-xl font-medium">
          {description}
        </p>
      )}
    </div>
  );
}
