import { forwardRef } from "react";
import { cn } from "../../utils/cn";

type AlertVariant = "info" | "success" | "warning" | "error";

type AlertRef = HTMLDivElement;
type AlertProps = React.ComponentPropsWithoutRef<"div"> & {
  variant?: AlertVariant;
  heading?: string;
  hideIcon?: boolean;
};

const variantClassNames = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
} as const satisfies Record<AlertVariant, string>;

const defaultIcons = {
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-6 shrink-0 stroke-current">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  ),
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
} as const satisfies Record<AlertVariant, React.ReactNode>;

export const Alert = forwardRef<AlertRef, AlertProps>((props, ref) => {
  const { className, variant = "info", heading, hideIcon = false, children, ...alertProps } = props;

  const displayIcon = hideIcon ? undefined : defaultIcons[variant];

  return (
    <div
      role="alert"
      className={cn("alert rounded-lg", variantClassNames[variant], className)}
      ref={ref}
      {...alertProps}
    >
      {displayIcon}
      <div>
        {heading && <h3 className="font-bold">{heading}</h3>}
        <span>{children}</span>
      </div>
    </div>
  );
});

Alert.displayName = "Alert";
