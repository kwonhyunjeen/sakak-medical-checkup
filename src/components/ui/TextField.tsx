import { forwardRef } from "react";
import { cn } from "../../utils/cn";

type TextFieldRef = HTMLInputElement;
type TextFieldProps = React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  description?: string;
  error?: string;
};

export const TextField = forwardRef<TextFieldRef, TextFieldProps>((props, ref) => {
  const {
    /* root props */
    className,

    /* etc. */
    label,
    description,
    error,
    ...inputProps
  } = props;

  return (
    <label className={cn("form-control w-full font-semibold", className)}>
      <span className="label">
        <span className="label-text">{label}</span>
        {description && <span className="label-text-alt">{description}</span>}
      </span>
      <input
        type="text"
        className={cn("input input-bordered w-full", error && "input-error")}
        ref={ref}
        {...inputProps}
      />
      <span className="label">{error && <span className="label-text-alt text-error">{error}</span>}</span>
    </label>
  );
});

TextField.displayName = "TextField";
