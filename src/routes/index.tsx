import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import PublicOnlyRoute from "@/routes/PublicOnlyRoute";
import SmartRedirect from "@/routes/SmartRedirect";

import NotFound from "@/shared/pages/NotFound";

import LandingPage from "@/pages/LandingPage";
import HomePage from "@/pages/HomePage";

import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";

import OccurrencesPage from "@/pages/OccurrencesPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* Landing — redireciona logados para /home, mas permite voltar */}
      <Route element={<SmartRedirect />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Rotas de auth — redireciona para /home se já estiver logado */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Rotas que exigem login */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/occurrences" element={<OccurrencesPage />} />
      </Route>

      {/* Página não encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
