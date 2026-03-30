import { figmaAssets } from "@/config/figmaAssets";
import { FigmaImage } from "@/components/ui/FigmaImage";
import { cn } from "@/utils/cn";

type ColumnProps = {
  src: string;
  alt: string;
  heightClass: string;
  tintClass: string;
};

function CollageColumn({ src, alt, heightClass, tintClass }: ColumnProps) {
  return (
    <div
      className={cn(
        "relative flex w-[min(160px,20vw)] flex-col justify-end overflow-hidden rounded-[9999px]",
        "shadow-[8px_10px_33px_rgba(0,0,0,0.44)]",
        heightClass,
      )}
    >
      <div
        className={cn("pointer-events-none absolute inset-0", tintClass)}
        aria-hidden
      />
      <div className="relative flex min-h-0 flex-1 items-end justify-center overflow-hidden bg-gradient-to-br from-bg-primary/40 to-bg-accent/40">
        <FigmaImage
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          fallbackClassName="h-full w-full"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_-5px_4px_40px_rgba(0,0,0,0.25)]"
        aria-hidden
      />
    </div>
  );
}

export function LandingPhotoCollage() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:flex-nowrap lg:justify-start">
      <CollageColumn
        src={figmaAssets.collage1}
        alt="Ambiente escolar"
        heightClass="h-[180px] md:h-[240px] lg:h-[280px]"
        tintClass="bg-surface-muted/40"
      />
      <div className="flex flex-col items-end gap-4 md:gap-6">
        <CollageColumn
          src={figmaAssets.collage2}
          alt="Atividades em sala"
          heightClass="h-[180px] md:h-[240px] lg:h-[280px]"
          tintClass="bg-secondary/50"
        />
        <CollageColumn
          src={figmaAssets.collage3}
          alt="Estudantes"
          heightClass="h-[180px] md:h-[240px] lg:h-[280px]"
          tintClass="bg-accent/35"
        />
      </div>
      <CollageColumn
        src={figmaAssets.collage4}
        alt="Comunidade escolar"
        heightClass="h-[180px] md:h-[240px] lg:h-[300px]"
        tintClass="bg-surface-muted/50"
      />
    </div>
  );
}
