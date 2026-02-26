import LogoPBL from "@/assets/logo_pbl.svg"

export default function Login() {
    return (
        <>
            <div className="flex min-h-full w-full p-16 items-center justify-center">
                <form className="flex flex-col bg-surface p-10 w-md gap-4 items-center justify-center border-border border-2 rounded-4xl">
                    <h2 className="text-2xl font-bold">Login</h2>
                    <img className="max-w-48" src={LogoPBL} />
                    <input type="email" placeholder="Email" className="w-full p-2 border rounded-xl" />
                    <input type="password" placeholder="Senha" className="w-full p-2 border rounded-xl" />
                    <button className="w-full bg-blue-600 text-white p-2 rounded-xl">Entrar</button>
                </form>
            </div >
        </>
    )
}