import { Link } from 'react-router-dom';
import LogoPBL from '@/assets/logo_pbl.svg';
import { cn } from '@/components/utils/cn';

type SiteHeaderProps = {
  loginHref?: string;
  className?: string;
};

export function SiteHeader({
  loginHref = '/login',
  className,
}: SiteHeaderProps) {
  return (
    <header
      className={cn(
        'flex w-full items-center justify-between gap-6 px-6 py-8 md:px-12 md:py-10',
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-4 md:gap-6">
        <img
          src={LogoPBL}
          alt="Logo Edu PBL"
          className="size-14 shrink-0 md:size-[84px]"
        />
        <div className="min-w-0 text-lg font-semibold leading-tight text-white md:text-[28px]">
          <p className="mb-0">ESCOLA ESTADUAL DE EDUCAÇÃO</p>
          <p>PROFISSIONAL PAULO BARBOSA LEITE</p>
        </div>
      </div>
      <Link
        to={loginHref}
        className="shrink-0 text-lg font-semibold text-white underline-offset-4 hover:underline md:text-[28px]"
      >
        Entrar
      </Link>
    </header>
  );
}
