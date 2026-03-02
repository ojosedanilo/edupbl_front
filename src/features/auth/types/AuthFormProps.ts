import type { ReactNode } from "react"

export type AuthFormProps = {
    formTitle: string
    submitButtonText: string
    fields: ReactNode
    footer?: ReactNode
    onSubmit: (event: React.SubmitEventHandler<HTMLFormElement>) => void
}