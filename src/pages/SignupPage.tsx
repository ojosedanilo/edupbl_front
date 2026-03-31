/**
 * SignupPage
 *
 * Página de cadastro de conta.
 *
 * Nota: o cadastro público ainda não está disponível — contas são criadas
 * pela coordenação via importação de CSV.
 */

import type { FormEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import LogoPBL from "@/assets/logo_pbl.svg";
import Fundo from "@/assets/fundo.webp";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

// ── Painel esquerdo ───────────────────────────────────────────────────────── //

function SignupBrandPanel() {
  return (
    <>
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${Fundo})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/90 to-bg-accent/90" />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center text-text">
        <p className="max-w-2xl text-light text-3xl font-bold leading-tight md:text-4xl lg:text-5xl lg:leading-none">
          Crie sua conta no EduPBL
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

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Ainda desativado
    setError(
      "Cadastro público ainda não está disponível. Entre em contato com a coordenação.",
    );
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full flex items-center justify-center p-6">
        <div className="flex w-full max-w-6xl overflow-hidden rounded-[30px] shadow-2xl flex-col lg:flex-row">
          {/* Painel esquerdo */}
          <div className="relative flex flex-1 flex-col items-center justify-center px-8 py-16 backdrop-blur-md bg-surface/5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_10px_40px_rgba(0,0,0,0.3)]">
            <SignupBrandPanel />
          </div>

          {/* Painel direito */}
          <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8 py-16 bg-surface/90 backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),0_20px_60px_rgba(0,0,0,0.25)]">
            <h1 className="text-4xl font-normal text-text">Criar conta</h1>

            <form
              className="flex w-full max-w-md flex-col items-center gap-6"
              onSubmit={onSubmit}
            >
              <TextField
                name="username"
                placeholder="Nome de usuário"
                required
                autoComplete="username"
                className="h-14 rounded-full border-2 border-primary"
              />

              <TextField
                name="first_name"
                placeholder="Nome"
                required
                autoComplete="given-name"
                className="h-14 rounded-full border-2 border-primary"
              />

              <TextField
                name="last_name"
                placeholder="Sobrenome"
                required
                autoComplete="family-name"
                className="h-14 rounded-full border-2 border-primary"
              />

              <TextField
                name="email"
                type="email"
                placeholder="E-mail"
                required
                autoComplete="email"
                className="h-14 rounded-full border-2 border-primary"
              />

              <TextField
                name="password"
                type="password"
                placeholder="Senha"
                required
                autoComplete="new-password"
                className="h-14 rounded-full border-2 border-primary"
              />

              {error && <p className="text-sm text-danger">{error}</p>}

              <Button
                type="submit"
                className="h-14 w-full max-w-xs bg-primary hover:bg-primary-hover text-text-inverse"
              >
                Criar conta
              </Button>
            </form>

            <p className="text-center text-text-muted">
              Já tem uma conta?{" "}
              <Link
                to="/entrar"
                className="font-semibold text-accent underline"
              >
                Entre.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
