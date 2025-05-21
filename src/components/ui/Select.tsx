import { forwardRef } from "react";
import { cn } from "../../utils/cn";

type SelectRef = HTMLSelectElement;
type SelectProps = React.ComponentPropsWithoutRef<"select"> & {
  label: string;
  description?: string;
  error?: string;
};

type SelectOptionRef = HTMLOptionElement;
type SelectOptionProps = React.ComponentPropsWithoutRef<"option">;

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
    <label className={cn("form-control w-full max-w-xs font-semibold", className)}>
      <span className="label">
        <span className="label-text">{label}</span>
        {description && <span className="label-text-alt">{description}</span>}
      </span>
      <select
        className={cn("select select-bordered w-full max-w-xs", error && "select-error")}
        ref={ref}
        {...selectProps}
      >
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
