"use client";
import React from "react";
import { Loader2 } from "lucide-react"; // optional spinner; run `npm i lucide-react`

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "danger";
}

export default function CustomButton({
  children,
  loading = false,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-4";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-l focus:ring-primary/30",
    secondary:
      "bg-secondary text-white hover:opacity-90 focus:ring-secondary/30",
    outline:
      "border border-border-primary text-foreground bg-transparent hover:bg-foreground/10 focus:ring-border-primary/30",
    danger: "bg-red text-white hover:opacity-90 focus:ring-red/30",
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${base} ${variants[variant]} ${className} ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
