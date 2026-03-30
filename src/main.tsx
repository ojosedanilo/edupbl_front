import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import { ThemeProvider } from "@/shared/utils/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/features/auth/hooks/AuthContext";
import { AppBootstrap } from "@/components/bootstrap/AppBootstrap";
import { AppRoutes } from "@/routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <div className="flex min-h-screen w-full bg-bg text-text transition-colors duration-300">
        <BrowserRouter>
          {/*
           * AuthProvider encapsula todo o estado de autenticação.
           * AppBootstrap bloqueia a renderização das rotas até que
           * o bootstrap (verificação da sessão) termine.
           */}
          <AuthProvider>
            <AppBootstrap>
              <AppRoutes />
            </AppBootstrap>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  </StrictMode>,
);
