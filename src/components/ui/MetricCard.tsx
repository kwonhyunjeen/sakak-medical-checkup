import { forwardRef } from "react";
import type { MedicalCheckupEvaluation } from "../../schemas/medicalCheckup";
import { cn } from "../../utils/cn";
import { Paper } from "./Paper";
import { Badge } from "./Badge";

export type MetricCardRef = React.ComponentRef<"div">;
export type MetricCardProps = Omit<React.ComponentPropsWithoutRef<"div">, "children"> & {
  name: React.ReactNode;
  level: string | number;
  unit?: string;
  description?: string;
  evaluation?: MedicalCheckupEvaluation;
};

const badgeVariants = {
  "정상(A)": "success",
  "정상(B)": "warning",
  질환의심: "error",
} as const satisfies Record<MedicalCheckupEvaluation, string>;

export const MetricCard = forwardRef<MetricCardRef, MetricCardProps>((props, ref) => {
  const { className, name, level, unit, description, evaluation, ...cardProps } = props;

  return (
    <Paper className={cn("flex flex-col items-center p-6 pb-7", className)} ref={ref} {...cardProps}>
      <div className="mb-3 text-lg font-semibold">{name}</div>
      <div>
        <span className="text-3xl">{level}</span> {unit && <span className="text-lg opacity-80">{unit}</span>}
      </div>
      {evaluation && (
        <Badge variant={badgeVariants[evaluation]} className="mt-2">
          {evaluation}
        </Badge>
      )}
      {description && <p className="text-sm">{description}</p>}
    </Paper>
  );
});

MetricCard.displayName = "MetricCard";
