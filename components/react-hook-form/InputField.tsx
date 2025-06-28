// components/InputField.tsx
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";
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

const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  ({ label, name, error, as = "input", ...rest }, ref) => {
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
            name={name}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={clsx(commonClasses)}
          />
        ) : (
          <input
            id={name}
            name={name}
            ref={ref as React.Ref<HTMLInputElement>}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            className={clsx(commonClasses)}
          />
        )}

        {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
