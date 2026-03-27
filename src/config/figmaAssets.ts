/**
 * URLs de imagens locais importadas de `/src/assets`.
 */
import collage1 from "@/assets/professor.webp";
import collage2 from "@/assets/lendo.webp";
import collage3 from "@/assets/formatura.webp";
import collage4 from "@/assets/mulherFormatura.webp";
import fundo from "@/assets/fundo.webp";
import logoPbl from "@/assets/logo_pbl.svg";

export const figmaAssets = {
  landingBackground: fundo,
  crestLogo: logoPbl,
  collage1,
  collage2,
  collage3,
  collage4,
  occurrencesSide: logoPbl,
} as const;
