"use client";
import React from "react";

type StyledCheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label?: string;
  imageSrc?: string;
  disabled?: boolean;
  className?: string;
};

export const StyledCheckbox: React.FC<StyledCheckboxProps> = ({
  checked,
  onChange,
  label,
  imageSrc,
  disabled,
  className = "",
}) => (
  <label
    className={`flex items-center gap-3 cursor-pointer select-none ${className}`}
  >
    {/* hidden native checkbox */}
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="peer sr-only"
    />

    {/* visible box */}
    <span
      className={`
        relative inline-flex h-4 w-4 items-center justify-center
        rounded-sm border-2 border-bd-primary
        peer-checked:border-primary peer-checked:bg-primary
        peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 peer-focus-visible:ring-offset-2
        peer-disabled:opacity-50
        [&>.check]:opacity-0 [&>.check]:scale-90
        peer-checked:[&>.check]:opacity-100 peer-checked:[&>.check]:scale-100
      `}
      aria-hidden
    >
      <svg
        width="17"
        height="13"
        viewBox="0 0 17 13"
        className="check h-3 w-3 transition-transform duration-150 ease-out
          will-change-transform transform-gpu"
      >
        <path
          d="M15.5 1.75L5.875 11.375L1.5 7"
          fill="none"
          stroke="var(--color-white)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>

    {/* optional image */}
    {imageSrc && (
      <img
        src={imageSrc}
        alt=""
        className="h-5 w-5 rounded object-contain select-none"
      />
    )}

    {/* label text */}
    {label && (
      <span className="text-sm font-medium text-sub-text">
        {label}
      </span>
    )}
  </label>
);
