// components/InputField.tsx
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import clsx from "clsx";

type Props = {
  label: string;
  name: string;
  error?: FieldError;
  as?: "input" | "textarea";
} & (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
);

export default function InputField({
  label,
  name,
  error,
  as = "input",
  ...rest
}: Props) {
  const commonClasses =
    "w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:border-gray-500";

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>

      {as === "textarea" ? (
        <textarea
          id={name}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={clsx(commonClasses)}
        />
      ) : (
        <input
          id={name}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          className={clsx(commonClasses)}
        />
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}
