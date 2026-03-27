import { SiteHeader } from "@/components/layout/SiteHeader";
import { GradientBackdrop } from "@/components/layout/GradientBackdrop";
import { LandingPhotoCollage } from "@/components/landing/LandingPhotoCollage";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <GradientBackdrop />
      <div className="relative z-10 flex flex-1 w-full flex-col">
        <SiteHeader />
        <main className="flex flex-1 min-h-0 max-h-screen w-full flex-col items-center justify-center gap-8 px-6 py-8 lg:px-12 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
          <section className="w-full max-w-2xl text-center text-white lg:text-left">
            <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              <span>Edu </span>
              <span className="text-[#22c55e]">PBL</span>
            </h1>
            <p className="text-lg leading-relaxed text-white/95 sm:text-xl md:text-2xl">
              O melhor aplicativo
              <br />
              para docentes
            </p>
          </section>
          <div className="flex w-full flex-1 items-center justify-center lg:w-auto lg:flex-1">
            <LandingPhotoCollage />
          </div>
        </main>
      </div>
    </div>
  );
}
