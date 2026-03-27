import AuthForm from "../components/AuthForm"
import InputField from "../components/InputField"
import { Link } from "react-router-dom";

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
                name="username"
                placeholder="Nome de Usuário"
                ariaLabel="Nome de Usuário"
              />
              <InputField
                type="text"
                name="first_name"
                placeholder="Nome"
                ariaLabel="Nome"
              />
              <InputField
                type="text"
                name="last_name"
                placeholder="Sobrenome"
                ariaLabel="Sobrenome"
              />

              <InputField
                type="email"
                name="email"
                placeholder="E-mail"
                ariaLabel="E-mail"
              />
              <InputField
                type="password"
                name="password"
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