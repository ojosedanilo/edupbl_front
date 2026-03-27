import { SiteHeader } from "@/components/layout/SiteHeader";
import { LandingPhotoCollage } from "@/components/landing/LandingPhotoCollage";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* 1. Imagem de Fundo (A escola) */}
      <div 
        className="absolute inset-0 bg-[url('/assets/fundo.png')] bg-cover bg-center"
        aria-hidden="true"
      />
      
      {/* 2. Overlay de Gradiente Verde/Amarelo (Igual à imagem) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#295230]/90 via-[#4a7c44]/85 to-[#ffae00]/70" />

      {/* 3. Conteúdo Principal */}
      <div className="relative z-10 flex min-h-screen w-full flex-col">
        <SiteHeader />
        
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-10 lg:flex-row lg:justify-between lg:px-20 xl:px-32">
          
          {/* Lado Esquerdo: Textos */}
          <section className="w-full max-w-2xl text-center text-white lg:text-left">
            <h1 className="mb-4 text-6xl font-bold leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[120px]">
              <span className="drop-shadow-lg">Edu</span>
              <span className="text-[#2ecc71] drop-shadow-lg"> PBL</span>
            </h1>
            <p className="text-2xl font-light leading-tight text-white/90 sm:text-3xl md:text-4xl lg:text-5xl">
              O melhor aplicativo
              <br />
              <span className="font-extralight opacity-80">para docentes</span>
            </p>
          </section>

          {/* Lado Direito: Colagem de Fotos */}
          <section className="mt-12 flex w-full items-center justify-center lg:mt-0 lg:w-1/2">
            <LandingPhotoCollage />
          </section>
        </main>

        {/* Faixa inferior preta (estilo rodapé da imagem) */}
        <div className="h-20 w-full bg-black/30 backdrop-blur-sm" />
      </div>
    </div>
  );
}