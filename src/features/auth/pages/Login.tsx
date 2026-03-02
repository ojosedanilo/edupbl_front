import AuthForm from "../components/AuthForm"
import InputField from "../components/InputField"
import { Link } from "react-router-dom";
import LogoPBL from "@/assets/logo_pbl.svg"

export default function Login() {
  return (
    <>
      <div className="flex min-h-full w-full p-16 itens-center justify-center">
        <AuthForm
          formTitle="Entrar"
          submitButtonText="Entrar"

          fields={
            <>
              <InputField
                type="email"
                placeholder="E-mail"
                aria-label="E-mail"
              />
              <InputField
                type="password"
                placeholder="Senha"
              />
            </>
          }

          footer={
            <>
              <p>Não tem uma conta? <Link to="/signup" className="text-accent">Crie-uma.</Link></p>
            </>
          }

          onSubmit={(e) => { e.preventDefault(); console.log("Salvo!"); }}
        />
      </div>
    </>
  )
}