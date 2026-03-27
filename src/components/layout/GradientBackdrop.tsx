import { figmaAssets } from "@/config/figmaAssets";
import { FigmaImage } from "@/components/ui/FigmaImage";
import { cn } from "@/utils/cn";

type GradientBackdropProps = {
  className?: string;
  /** Usa textura exportada do Figma (MCP) por cima do gradiente */
  withFigmaTexture?: boolean;
};

export function GradientBackdrop({
  className,
  withFigmaTexture = true,
}: GradientBackdropProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />
      {withFigmaTexture ? (
        <FigmaImage
          src={figmaAssets.landingBackground}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-20"
          fallbackClassName="absolute inset-0 opacity-0"
        />
      ) : null}
    </div>
  );
}
