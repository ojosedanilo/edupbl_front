import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "@/routes/ProtectedRoutes";

import NotFound from "@/shared/pages/NotFound";

import LandingPage from "@/pages/LandingPage";
import HomePage from "@/pages/HomePage";

import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";

import OccurrencesPage from "@/pages/OccurrencesPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* Entrar/Criar conta */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* Página não encontrada */}
      <Route path="*" element={<NotFound />} />

      {/* Rotas que exigem login */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/occurrences" element={<OccurrencesPage />} />
      </Route>
    </Routes>
  );
}
