import type { InputFieldProps } from "../models/InputFieldProps"

export default function InputField(props: InputFieldProps) {
  return (
    <input
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      className={props.className + " " + "w-full p-2 border rounded-xl"}
      aria-label={props.ariaLabel}
    />
  )
}