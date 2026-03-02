import AuthForm from "@/features/auth/components/AuthForm"
import InputField from "@/features/auth/components/InputField"
import { Link } from "react-router-dom";
import LogoPBL from "@/assets/logo_pbl.svg"

export default function Signup() {
    return (
        <>
            <div className="flex min-h-full w-full p-16 itens-center justify-center">
                <AuthForm
                    formTitle="Criar conta"
                    submitButtonText="Criar conta"

                    fields={
                        <>
                            <InputField
                                type="text"
                                placeholder="Nome"
                                ariaLabel="Nome"
                            />
                            <InputField
                                type="text"
                                placeholder="Sobrenome"
                                ariaLabel="Sobrenome"
                            />

                            <InputField
                                type="email"
                                placeholder="E-mail"
                                ariaLabel="E-mail"
                            />
                            <InputField
                                type="password"
                                placeholder="Senha"
                            />
                        </>
                    }

                    footer={
                        <>
                            <p>Já tem uma conta? <Link to="/login" className="text-accent">Entre.</Link></p>
                        </>
                    }

                    onSubmit={(e) => { e.preventDefault(); console.log("Salvo!"); }}
                />
            </div>
        </>
    )
}