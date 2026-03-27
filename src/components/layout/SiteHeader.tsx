import { Link } from "react-router-dom";
import LogoPBL from "@/assets/logo_pbl.svg";
import { cn } from "@/components/utils/cn";

type SiteHeaderProps = {
  loginHref?: string;
  className?: string;
};

export function SiteHeader({
  loginHref = "/login",
  className,
}: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "flex w-full items-center justify-between gap-6 px-6 py-8 md:px-12 md:py-10",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3 md:gap-4">
        <img
          src={LogoPBL}
          alt="Logo Edu PBL"
          className="size-12 shrink-0 md:size-16"
        />
        <div className="min-w-0 text-sm font-semibold leading-tight text-white md:text-lg">
          <p className="mb-0">ESCOLA ESTADUAL DE EDUCAÇÃO</p>
          <p>PROFISSIONAL PAULO BARBOSA LEITE</p>
        </div>
      </div>
      <Link
        to={loginHref}
        className="shrink-0 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 md:text-base"
      >
        Entrar
      </Link>
    </header>
  );
}
