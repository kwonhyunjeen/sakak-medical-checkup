import { forwardRef } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "default" | "primary" | "error";

type ButtonRef = HTMLButtonElement;
type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  loading?: boolean;
};

/** Submit 이벤트 등으로 이어지는 것을 차단 */
const onClickDisabled = (event: React.MouseEvent) => event.preventDefault();

const variantClassNames = {
  default: "btn-default",
  primary: "btn-primary",
  error: "btn-error",
} as const satisfies Record<ButtonVariant, string>;

export const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const {
    children,
    className,
    disabled = false,
    loading = false,
    type = "button",
    variant = "default",
    onClick,
    onClickCapture,
    onDoubleClick,
    onDoubleClickCapture,
    ...buttonProps
  } = props;

  /** disabled 스타일을 입히지 않고 이벤트만 차단 */
  const eventDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={cn("btn w-full", variantClassNames[variant], disabled && "btn-disabled", className)}
      aria-disabled={eventDisabled}
      onClick={eventDisabled ? onClickDisabled : onClick}
      onClickCapture={eventDisabled ? onClickDisabled : onClickCapture}
      onDoubleClick={eventDisabled ? onClickDisabled : onDoubleClick}
      onDoubleClickCapture={eventDisabled ? onClickDisabled : onDoubleClickCapture}
      ref={ref}
      {...buttonProps}
    >
      {loading ? <span className="loading loading-dots loading-sm"></span> : children}
    </button>
  );
});

Button.displayName = "Button";
