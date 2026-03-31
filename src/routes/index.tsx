import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import PublicOnlyRoute from "@/routes/PublicOnlyRoute";
import SmartRedirect from "@/routes/SmartRedirect";

import NotFound from "@/shared/pages/NotFound";

import LandingPage from "@/pages/LandingPage";
import HomePage from "@/pages/HomePage";

import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";

import DelaysPage from "@/pages/DelaysPage";
import SchedulesPage from "@/pages/SchedulesPage";
import UsersPage from "@/pages/UsersPage";

import OccurrencesPage from "@/pages/OccurrencesPage";

import { Permissions } from "@/features/auth/models/Permissions";
import PermissionRoute from "@/routes/PermissionRoute";

export function AppRoutes() {
  return (
    <Routes>
      {/* Landing — redireciona logados para /inicio, mas permite voltar */}
      <Route element={<SmartRedirect />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Rotas de auth — redireciona para /inicio se já estiver logado */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/entrar" element={<LoginPage />} />
        <Route path="/cadastrar" element={<SignupPage />} />
      </Route>

      {/* Rotas que exigem login */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/inicio" element={<HomePage />} />

        {/* Qualquer usuário logado pode ver suas próprias ocorrências */}
        <Route
          element={
            <PermissionRoute
              anyOf={[
                Permissions.OCCURRENCES_CREATE,
                Permissions.OCCURRENCES_VIEW_ALL,
                Permissions.OCCURRENCES_VIEW_OWN,
                Permissions.OCCURRENCES_VIEW_CHILD,
              ]}
            />
          }
        >
          <Route path="/ocorrencias" element={<OccurrencesPage />} />
        </Route>

        {/* Porteiro, coordenação, professor DT e aluno */}
        <Route
          element={
            <PermissionRoute
              anyOf={[
                Permissions.DELAYS_CREATE,
                Permissions.DELAYS_APPROVE,
                Permissions.DELAYS_VIEW_ALL,
                Permissions.DELAYS_VIEW_OWN,
                Permissions.DELAYS_VIEW_CHILD,
                Permissions.DELAYS_VIEW_OWN_CLASS,
              ]}
            />
          }
        >
          <Route path="/atrasos" element={<DelaysPage />} />
        </Route>

        {/* Horários — todos os logados */}
        <Route
          element={
            <PermissionRoute
              anyOf={[Permissions.SCHEDULES_VIEW, Permissions.SCHEDULES_MANAGE]}
            />
          }
        >
          <Route path="/horarios" element={<SchedulesPage />} />
        </Route>

        {/* Usuários — só coordenação e admin */}
        <Route
          element={<PermissionRoute anyOf={[Permissions.USER_VIEW_ALL]} />}
        >
          <Route path="/usuarios" element={<UsersPage />} />
        </Route>
      </Route>

      {/* Página não encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
