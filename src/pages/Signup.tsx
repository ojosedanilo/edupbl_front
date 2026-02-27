import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoPBL from "@/assets/logo_pbl.svg"
import { signup as apiSignup } from '@/features/auth/services/authService';

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ username?: string; email?: string; password?: string }>({});



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            // validação simples no cliente
            const errors: any = {};
            if (!username.trim()) errors.username = 'Nome de usuário é obrigatório';
            if (!email.trim()) errors.email = 'E-mail é obrigatório';
            else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = 'E-mail inválido';
            if (!password) errors.password = 'Senha é obrigatória';
            else if (password.length < 6) errors.password = 'Senha deve ter ao menos 6 caracteres';

            setFieldErrors(errors);
            if (Object.keys(errors).length > 0) return;

            await apiSignup(username.trim(), email.trim(), password);
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.detail || err?.detail || 'Erro ao criar conta');
        }
    };

    return (
        <>
            <div className="flex min-h-full w-full p-16 itens-center justify-center">
                <form onSubmit={handleSubmit} className="flex flex-col bg-surface p-10 w-md gap-4 items-center justify-center border-border border-2 rounded-4xl">
                    <h2 className="text-center text-2xl font-bold">Criar conta</h2>
                    <img className="max-w-48" src={LogoPBL} />
                    {error && <p className="text-red-600">{error}</p>}
                    <input
                        type="text"
                        placeholder="Nome de usuário"
                        className="w-full p-2 border rounded-xl"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        aria-label="Nome de usuário"
                    />
                    {fieldErrors.username && <p className="text-sm text-red-600">{fieldErrors.username}</p>}
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
                    <button className="w-full bg-blue-600 text-center text-white p-2 rounded-xl" type="submit">Criar conta</button>
                    <p>Já tem uma conta? <Link to="/login" className="text-accent">Entre.</Link></p>
                </form>
            </div >
        </>
    )
}