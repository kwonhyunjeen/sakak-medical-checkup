import { forwardRef } from "react";
import { Card, type CardProps, type CardRef } from "./Card";

export type MetricCardRef = CardRef;
export type MetricCardProps = Omit<CardProps, "children"> & {
  level: string | number;
  unit?: string;
};

export const MetricCard = forwardRef<MetricCardRef, MetricCardProps>((props, ref) => {
  const { level, unit, ...rest } = props;

  return (
    <Card ref={ref} {...rest}>
      <div className="flex items-baseline gap-1">
        <span>{level}</span>
        {unit && <span className="text-sm text-opacity-70">{unit}</span>}
      </div>
    </Card>
  );
});

MetricCard.displayName = "MetricCard";
