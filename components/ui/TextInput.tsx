"use client";
import EyeCloseIcon from "@/assests/icons/svg/EyeCloseIcon";
import EyeOpenIcon from "@/assests/icons/svg/EyeOpenIcon";
import React, { useState } from "react";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function TextInput({
  label,
  placeholder,
  type = "text",
  icon,
  value,
  onChange,
  className = "",
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <label className="block text-sm font-medium text-input-text">
      {label && <span className="mb-1 block">{label}</span>}

      <div className="relative mt-2">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-md border border-bd-primary bg-input-bg px-3 py-2 pr-10 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 ${className}`}
        />

        {/* icon on the right */}
        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-icon-grey pointer-events-none">
            {icon}
          </span>
        )}

        {/* eye toggle for password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
          >
            {showPassword ? (
              // eye-off icon
              <EyeCloseIcon className="text-icon-grey"/>
            ) : (
              // eye icon
              <EyeOpenIcon className="text-icon-grey"/>
            )}
          </button>
        )}
      </div>
    </label>
  );
}