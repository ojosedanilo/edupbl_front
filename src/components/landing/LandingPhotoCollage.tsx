import { figmaAssets } from '@/config/figmaAssets';
import { FigmaImage } from '@/components/ui/FigmaImage';
import { cn } from '@/components/utils/cn';

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
        'relative flex w-[min(221px,28vw)] flex-col justify-end overflow-hidden rounded-[9999px]',
        'shadow-[8px_10px_33px_rgba(0,0,0,0.44)]',
        heightClass,
      )}
    >
      <div
        className={cn('pointer-events-none absolute inset-0', tintClass)}
        aria-hidden
      />
      <div className="relative flex min-h-0 flex-1 items-end justify-center overflow-hidden">
        <FigmaImage
          src={src}
          alt={alt}
          className="max-h-full min-h-[60%] w-auto max-w-none object-cover"
          fallbackClassName="min-h-[80%] w-full"
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
    <div className="flex flex-wrap items-start justify-center gap-8 md:gap-14 lg:flex-nowrap lg:justify-start">
      <CollageColumn
        src={figmaAssets.collage1}
        alt="Ambiente escolar"
        heightClass="h-[min(450px,55vh)]"
        tintClass="bg-text-muted/40"
      />
      <div className="flex flex-col items-end gap-8 md:gap-14">
        <CollageColumn
          src={figmaAssets.collage2}
          alt="Atividades em sala"
          heightClass="h-[min(450px,55vh)]"
          tintClass="bg-secondary/50"
        />
        <CollageColumn
          src={figmaAssets.collage3}
          alt="Estudantes"
          heightClass="h-[min(450px,55vh)]"
          tintClass="bg-accent/35"
        />
      </div>
      <CollageColumn
        src={figmaAssets.collage4}
        alt="Comunidade escolar"
        heightClass="h-[min(560px,62vh)]"
        tintClass="bg-text-muted/50"
      />
    </div>
  );
}
