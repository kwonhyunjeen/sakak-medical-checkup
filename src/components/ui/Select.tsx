import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export type SelectRef = React.ComponentRef<"select">;
export type SelectProps = React.ComponentPropsWithoutRef<"select"> & {
  label: string;
  description?: string;
  error?: string;
};

export type SelectOptionRef = React.ComponentRef<"option">;
export type SelectOptionProps = React.ComponentPropsWithoutRef<"option">;

export const Select = forwardRef<SelectRef, SelectProps>((props, ref) => {
  const {
    /* root props */
    className,

    /* etc. */
    children,
    label,
    description,
    error,
    ...selectProps
  } = props;

  return (
    <label className={cn("form-control w-full font-semibold", className)}>
      <span className="label">
        <span className="label-text">{label}</span>
        {description && <span className="label-text-alt">{description}</span>}
      </span>
      <select className={cn("select select-bordered w-full", error && "select-error")} ref={ref} {...selectProps}>
        {children}
      </select>
      <span className="label">{error && <span className="label-text-alt text-error">{error}</span>}</span>
    </label>
  );
});

export const SelectOption = forwardRef<SelectOptionRef, SelectOptionProps>((props, ref) => {
  return <option ref={ref} {...props} />;
});

Select.displayName = "Select";
SelectOption.displayName = "SelectOption";
