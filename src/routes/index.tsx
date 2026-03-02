import { useTheme } from '@/shared/utils/ThemeContext';

import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "@/routes/ProtectedRoutes";

import Index from "@/shared/pages/Index";
import NotFound from "@/shared/pages/NotFound";

import Home from "@/shared/pages/Home";

// Auth (Login/Signup)
import Login from "@/features/auth/pages/Login";
import Signup from "@/features/auth/pages/Signup";

export function AppRoutes() {
    const { setTheme } = useTheme();
    // !!! Implementar verificação de login, depois aplicar nas rotas protegidas !!!

    return (
        <Routes>
            {/* Entrar/Criar conta */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Página não encontrada */}
            <Route path="*" element={<NotFound />} />

            {/* Rotas que exigem login */}
            <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    );
}
