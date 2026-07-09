"use client";
import { BtnProps } from "@/types/ComponentProps";
import { useTheme } from "next-themes";
import React from "react";

const Button: React.FC<BtnProps> = ({
  children,
  className = "",
  type = "button",
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <button
      type={type}
      className={`border-solid border-1 ${
        theme === "light" ? "border-gray-900" : "border-gray-200"
      } px-4 md:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1 ${className}`}
      aria-pressed={props["aria-pressed"]}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
