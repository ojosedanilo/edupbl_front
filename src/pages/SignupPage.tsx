import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import LogoPBL from "@/assets/logo_pbl.svg";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

export default function SignupPage() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.alert(
      "Cadastro público ainda não está disponível. Entre em contato com a coordenação.",
    );
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row lg:overflow-hidden">
      <div className="flex flex-[1_1_45%] flex-col items-center justify-center gap-6 bg-gradient-to-r from-bg-primary to-bg-accent px-8 py-16 text-center text-text opacity-95 lg:py-24">
        <p className="max-w-xl text-3xl font-bold md:text-5xl">
          Participe do EduPBL
        </p>
        <p className="max-w-md text-lg text-text/90">
          Ambiente digital da escola para ocorrências, comunicação e gestão
          pedagógica.
        </p>
        <div className="relative size-40 shrink-0 md:size-56">
          <img src={LogoPBL} alt="" className="size-full object-contain" />
        </div>
      </div>

      <div className="flex flex-[1_1_55%] flex-col items-center justify-center gap-6 overflow-y-auto bg-surface px-8 py-16 shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:py-12">
        <h1 className="text-4xl font-normal text-text">Criar conta</h1>
        <form
          className="flex w-full max-w-md flex-col items-center gap-4"
          onSubmit={onSubmit}
        >
          <TextField
            name="username"
            placeholder="Nome de usuário"
            required
            aria-label="Nome de usuário"
            autoComplete="username"
          />
          <TextField
            name="first_name"
            placeholder="Nome"
            required
            aria-label="Nome"
            autoComplete="given-name"
          />
          <TextField
            name="last_name"
            placeholder="Sobrenome"
            required
            aria-label="Sobrenome"
            autoComplete="family-name"
          />
          <TextField
            name="email"
            type="email"
            placeholder="E-mail"
            required
            aria-label="E-mail"
            autoComplete="email"
          />
          <TextField
            name="password"
            type="password"
            placeholder="Senha"
            required
            aria-label="Senha"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            className="mt-2 h-14 w-full max-w-xs bg-primary hover:bg-primary-hover text-text-inverse"
          >
            Criar conta
          </Button>
        </form>
        <p className="text-center text-text-muted">
          Já tem uma conta?{" "}
          <Link to="/entrar" className="font-semibold text-accent underline">
            Entre.
          </Link>
        </p>
      </div>
    </div>
  );
}
