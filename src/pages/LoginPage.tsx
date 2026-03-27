import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoPBL from '@/assets/logo_pbl.svg';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { useLogin } from '@/features/auth/hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');
    try {
      await login.mutateAsync({ username: email, password });
      navigate('/home', { replace: true });
    } catch {
      setError('E-mail ou senha incorretos.');
    }
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row lg:overflow-hidden">
      <div
        className="flex flex-[1_1_50%] flex-col items-center justify-center gap-6 bg-gradient-to-r from-[#295230] to-[#ffae00] px-8 py-16 text-center text-white opacity-95 lg:min-h-0 lg:py-24"
        data-node-id="139:317"
      >
        <p className="max-w-2xl text-3xl font-bold leading-tight md:text-5xl lg:text-[80px] lg:leading-none">
          Seja bem-vindo(a) ao EduPBL!
        </p>
        <div className="relative size-48 shrink-0 md:size-64 lg:size-[400px]">
          <img
            src={LogoPBL}
            alt=""
            className="size-full object-contain drop-shadow-lg"
          />
        </div>
      </div>

      <div
        className="flex flex-[1_1_50%] flex-col items-center justify-center gap-8 bg-surface px-8 py-16 shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:min-h-0 lg:py-24"
        data-node-id="139:615"
      >
        <h1 className="text-4xl font-normal text-text">Entrar</h1>
        <form
          className="flex w-full max-w-md flex-col items-center gap-6"
          onSubmit={onSubmit}
        >
          <TextField
            name="email"
            type="email"
            autoComplete="email"
            placeholder="E-mail"
            required
            aria-label="E-mail"
          />
          <TextField
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Senha"
            required
            aria-label="Senha"
          />
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button
            type="submit"
            className="h-14 w-full max-w-xs"
            disabled={login.isPending}
          >
            {login.isPending ? 'Entrando…' : 'Entrar'}
          </Button>
        </form>
        <p className="text-center text-text-muted">
          Não tem uma conta?{' '}
          <Link to="/signup" className="font-semibold text-accent underline">
            Crie uma.
          </Link>
        </p>
      </div>
    </div>
  );
}
