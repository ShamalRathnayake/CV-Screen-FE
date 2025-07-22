import React from "react";
import type { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TextInputProps = {
  name: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onAppendClick?: (
    event: React.MouseEvent<SVGSVGElement> | React.KeyboardEvent<SVGSVGElement>
  ) => void;
  placeholder?: string;
  prependIcon?: IconDefinition;
  appendIcon?: IconDefinition;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  type = "text",
  onAppendClick,
  placeholder,
  prependIcon,
  appendIcon,
  error,
  touched,
  disabled,
  className = "",
  ...rest
}) => {
  return (
    <div className={`w-full mb-6  ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 font-medium text-sm text-gray-700"
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-center border rounded px-3 py-2 ${
          error && touched ? "border-red-500" : ""
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      >
        {prependIcon && (
          <FontAwesomeIcon
            icon={prependIcon}
            className={`mr-2 text-gray-300 ${
              disabled ? "cursor-not-allowed" : ""
            }`}
          />
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`flex-1 outline-none bg-transparent text-sm p-px ${
            disabled ? "cursor-not-allowed" : ""
          }`}
          {...rest}
        />
        {appendIcon && (
          <FontAwesomeIcon
            icon={appendIcon}
            className={`ml-2  text-gray-300  cursor-pointer ${
              disabled ? "cursor-not-allowed" : ""
            }`}
            onClick={(e) => onAppendClick?.(e)}
            onKeyDown={(e) => onAppendClick?.(e)}
          />
        )}
      </div>
      {error && touched && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default TextInput;
