import clsx from "clsx";
import { ComponentProps } from "react";

interface ButtonProps extends Omit<ComponentProps<"button">, "className"> {
  variant?: "primary" | "secondary";
  size?: "regular" | "icon";
}

export function Button({
  children,
  variant = "primary",
  size = "regular",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center gap-2 py-2 rounded hover:bg-white/[0.06] transition-colors",
        {
          "px-4": size === "regular",
          "px-2": size === "icon",
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
}
