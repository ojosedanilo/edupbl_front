import { Link } from "react-router-dom";
import LogoPBL from "@/assets/logo_pbl.svg"

export default function NotFound() {
    return (
        <>
            <div className="flex min-h-full w-full p-16 items-center justify-center">
                <div className="flex flex-col bg-surface p-10 w-md gap-4 items-center justify-center border-border border-2 rounded-4xl">
                    <h1 className="text-center text-3xl font-bold align-middle">Página não encontrada :(</h1>
                    <img className="max-w-48" src={LogoPBL} />
                </div>
            </div >
        </>
    )
}