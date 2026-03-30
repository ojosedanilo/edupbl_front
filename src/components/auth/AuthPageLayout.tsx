/**
 * AuthPageLayout
 *
 * Layout de duas colunas compartilhado por LoginPage e SignupPage.
 *
 * Estrutura:
 *   [Coluna esquerda — painel de marca] | [Coluna direita — formulário]
 *
 * Props:
 *   - leftPanel: conteúdo da coluna esquerda (logo, slogan, etc.)
 *   - children: formulário e conteúdo da coluna direita
 *
 * A separação existe porque LoginPage tem fundo com imagem real (fundo.webp)
 * enquanto SignupPage usa um gradiente, então cada página controla
 * o estilo do painel esquerdo independentemente.
 */

import type { ReactNode } from "react";

type AuthPageLayoutProps = {
  /** Conteúdo da coluna esquerda (marca, logo, slogan) */
  leftPanel: ReactNode;
  /** Conteúdo da coluna direita (título, formulário, link) */
  children: ReactNode;
};

export function AuthPageLayout({ leftPanel, children }: AuthPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row lg:overflow-hidden">
      {/* Coluna esquerda — painel de identidade da marca */}
      <div className="flex flex-[1_1_45%] flex-col items-center justify-center px-8 py-16 lg:py-24">
        {leftPanel}
      </div>

      {/* Coluna direita — área do formulário */}
      <div className="flex flex-[1_1_55%] flex-col items-center justify-center gap-8 overflow-y-auto bg-surface px-8 py-16 shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:py-12">
        {children}
      </div>
    </div>
  );
}
