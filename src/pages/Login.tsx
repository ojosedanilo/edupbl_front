import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoPBL from "@/assets/logo_pbl.svg"
import { login as apiLogin } from '@/features/auth/services/authService';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const errors: any = {};
            if (!email.trim()) errors.email = 'E-mail é obrigatório';
            if (!password) errors.password = 'Senha é obrigatória';
            setFieldErrors(errors);
            if (Object.keys(errors).length > 0) return;

            await apiLogin(email.trim(), password);
            navigate('/');
        } catch (err: any) {
            const detail = err.response?.data?.detail || err?.detail || 'Erro ao entrar';
            setError(detail);
        }
    };

    return (
        <>
            <div className="flex min-h-full w-full p-16 itens-center justify-center">
                <form onSubmit={handleSubmit} className="flex flex-col bg-surface p-10 w-md gap-4 items-center justify-center border-border border-2 rounded-4xl">
                    <h2 className="text-center text-2xl font-bold">Entrar</h2>
                    <img className="max-w-48" src={LogoPBL} />
                    {error && <p className="text-red-600">{error}</p>}
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="w-full p-2 border rounded-xl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="E-mail"
                    />
                    {fieldErrors.email && <p className="text-sm text-red-600">{fieldErrors.email}</p>}
                    <input
                        type="password"
                        placeholder="Senha"
                        className="w-full p-2 border rounded-xl"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {fieldErrors.password && <p className="text-sm text-red-600">{fieldErrors.password}</p>}
                    <button className="w-full bg-blue-600 text-center text-white p-2 rounded-xl" type="submit">Entrar</button>
                    <p>Não tem uma conta? <Link to="/signup" className="text-accent">Crie-uma.</Link></p>
                </form>
            </div >
        </>
    )
}