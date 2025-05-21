import { forwardRef } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "default" | "primary" | "error";

type ButtonRef = HTMLButtonElement;
type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
};

const variantClassNames = {
  default: "btn-default",
  primary: "btn-primary",
  error: "btn-error",
} as const satisfies Record<ButtonVariant, string>;

export const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const { className, type = "button", variant = "default", ...buttonProps } = props;
  return <button type={type} className={cn("btn", variantClassNames[variant], className)} ref={ref} {...buttonProps} />;
});

Button.displayName = "Button";
