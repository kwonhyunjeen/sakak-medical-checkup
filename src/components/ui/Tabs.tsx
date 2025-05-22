import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export type TabsRef = React.ComponentRef<"div">;
export type TabsProps = React.ComponentPropsWithoutRef<"div">;

export type TabsTriggerRef = React.ComponentRef<"button">;
export type TabsTriggerProps = Omit<React.ComponentPropsWithoutRef<"button">, "type"> & {
  selected?: boolean;
};

export const Tabs = forwardRef<TabsRef, TabsProps>((props, ref) => {
  const { className, children, ...tabsProps } = props;

  return (
    <div role="tablist" className={cn("tabs-boxed tabs bg-transparent p-0", className)} ref={ref} {...tabsProps}>
      {children}
    </div>
  );
});

export const TabsTrigger = forwardRef<TabsTriggerRef, TabsTriggerProps>((props, ref) => {
  const { className, selected, ...triggerProps } = props;
  return (
    <button type="button" className={cn("tab", selected && "tab-active", className)} ref={ref} {...triggerProps} />
  );
});

Tabs.displayName = "Tabs";
TabsTrigger.displayName = "TabsTrigger";
