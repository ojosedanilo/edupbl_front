import { useState } from "react";
import { cn } from "@/utils/cn";

type FigmaImageProps = {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
};

export function FigmaImage({
  src,
  alt,
  className,
  fallbackClassName,
}: FigmaImageProps) {
  const [ok, setOk] = useState(true);

  if (!ok) {
    return (
      <div
        className={cn("bg-secondary/40", "rounded-[9999px]", fallbackClassName)}
        aria-hidden
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setOk(false)}
    />
  );
}
