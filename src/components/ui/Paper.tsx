import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export type PaperRef = React.ComponentRef<"div">;
export type PaperProps = React.ComponentPropsWithoutRef<"div">;

export const Paper = forwardRef<PaperRef, PaperProps>((props, ref) => {
  const { children, className, ...paperProps } = props;

  return (
    <div className={cn("card rounded-xl bg-base-100 shadow-md", className)} ref={ref} {...paperProps}>
      {children}
    </div>
  );
});

Paper.displayName = "Paper";
