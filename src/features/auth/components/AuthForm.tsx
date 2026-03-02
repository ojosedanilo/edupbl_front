import LogoPBL from "@/assets/logo_pbl.svg"
import AuthFormProps from "@/features/auth/types/AuthFormProps"

export default function AuthForm(props: AuthFormProps) {
    return (
        <form onSubmit={props.onSubmit} className="flex flex-col bg-surface p-10 w-md gap-4 items-center justify-center border-border border-2 rounded-4xl">
            <h2 className="text-center text-2xl font-bold">{props.formTitle}</h2>
            <img className="max-w-48" src={LogoPBL} />

            <div className="flex flex-col gap-4 items-center justify-center
            w-full">
                {props.fields}
            </div>

            <button className="w-full bg-blue-600 text-center text-white p-2 rounded-xl" type="submit">{props.submitButtonText}</button>

            {props.footer}
        </form>
    )
}