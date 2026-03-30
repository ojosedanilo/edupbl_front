/**
 * LoginPage
 *
 * Página de autenticação com e-mail e senha.
 *
 * Fluxo:
 *   1. Usuário preenche e-mail e senha
 *   2. useLogin chama POST /auth/token e popula o cache [\"me\"]
 *   3. Navegação para /inicio em caso de sucesso
 *   4. Mensagem de erro genérica em caso de falha (não vaza se e-mail existe)
 */

import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import LogoPBL from "@/assets/logo_pbl.svg";
import Fundo from "@/assets/fundo.webp";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";
import { useLogin } from "@/features/auth/hooks/useAuth";

// ── Painel esquerdo ───────────────────────────────────────────────────────── //

function LoginBrandPanel() {
  return (
    <>
      {/* Imagem de fundo com gradiente por cima */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${Fundo})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/90 to-bg-accent/90" />

      {/* Conteúdo sobre o fundo */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center text-text">
        <p className="max-w-2xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl lg:leading-none">
          Seja bem-vindo(a) ao EduPBL!
        </p>
        <div className="relative size-48 md:size-64 lg:size-[300px]">
          <img
            src={LogoPBL}
            alt="Logo EduPBL"
            className="size-full object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </>
  );
}

// ── Página principal ──────────────────────────────────────────────────────── //

export default function LoginPage() {
  const navigate = useNavigate();
  const { mutateAsync: login, isPending } = useLogin();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    try {
      await login({ username: email, password });
      navigate("/inicio", { replace: true });
    } catch {
      // Mensagem genérica para não vazar se o e-mail existe ou não
      setError("E-mail ou senha incorretos.");
    }
  }

  return (
    // Layout de tela cheia com fundo + gradiente no painel esquerdo
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full flex items-center justify-center p-6">
        <div className="flex w-full max-w-6xl overflow-hidden rounded-[30px] shadow-2xl flex-col lg:flex-row">
          {/* Painel esquerdo com posição relativa para os elementos absolutos */}
          <div className="relative flex flex-1 flex-col items-center justify-center px-8 py-16 backdrop-blur-md bg-text/5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_10px_40px_rgba(0,0,0,0.3)]">
            <LoginBrandPanel />
          </div>

          {/* Painel direito — formulário */}
          <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8 py-16 bg-surface/90 backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),0_20px_60px_rgba(0,0,0,0.25)]">
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
                className="h-14 rounded-full border-2 border-primary"
              />

              <TextField
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Senha"
                required
                aria-label="Senha"
                className="h-14 rounded-full border-2 border-primary"
              />

              {error && <p className="text-sm text-danger">{error}</p>}

              <Button
                type="submit"
                className="h-14 w-full max-w-xs bg-primary hover:bg-primary-hover text-text-inverse"
                disabled={isPending}
              >
                {isPending ? "Entrando…" : "Entrar"}
              </Button>
            </form>

            <p className="text-center text-text-muted">
              Não tem uma conta?{" "}
              <Link to="/cadastrar" className="font-semibold text-accent underline">
                Crie uma.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
