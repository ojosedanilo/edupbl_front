import type { InputHTMLAttributes } from 'react';
import { cn } from '@/components/utils/cn';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function TextField({
  label,
  error,
  id,
  className,
  ...props
}: TextFieldProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex w-full max-w-md flex-col gap-1">
      {label ? (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-text-muted"
        >
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          'h-14 w-full rounded-full border-4 border-primary bg-transparent px-5 text-text shadow-md',
          'placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40',
          error && 'border-danger',
          className,
        )}
        {...props}
      />
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}
