import { forwardRef } from "react";
import { cn } from "../../utils/cn";

type BadgeVariant = "outline" | "success" | "warning" | "error";

export type BadgeRef = React.ComponentRef<"span">;
export type BadgeProps = React.ComponentPropsWithoutRef<"span"> & {
  variant?: BadgeVariant;
};

const variantClassNames = {
  outline: "badge-outline",
  success: "badge-success text-white",
  warning: "badge-warning text-white",
  error: "badge-error text-white",
} as const satisfies Record<BadgeVariant, string>;

export const Badge = forwardRef<BadgeRef, BadgeProps>((props, ref) => {
  const { children, className, variant = "outline", ...badgeProps } = props;

  return (
    <span
      className={cn("badge badge-md h-7 rounded-lg px-2 py-1", variantClassNames[variant], className)}
      ref={ref}
      {...badgeProps}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
