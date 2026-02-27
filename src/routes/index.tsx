import { useTheme } from '@/shared/utils/ThemeContext';

import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "@/routes/ProtectedRoutes";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";

export function AppRoutes() {
    const { setTheme } = useTheme();
    // !!! Implementar verificação de login, depois aplicar nas rotas protegidas !!!

    return (
        <Routes>
            {/* Entrar/Criar conta */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Página não encontrada */}
            <Route path="*" element={<NotFound />} />

            {/* Rotas que exigem login */}
            <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    );
}
