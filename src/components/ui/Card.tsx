import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { MedicalCheckupEvaluation } from "../../schemas/medicalCheckup";

export type CardRef = HTMLDivElement;
export type CardProps = React.ComponentPropsWithoutRef<"div"> & {
  children?: React.ReactNode;
  heading?: string;
  description?: string;
  evaluation?: MedicalCheckupEvaluation;
  bordered?: boolean;
};

// 상태에 따른 색상 스타일
const badgeClasses = {
  "정상(A)": "badge-success",
  "정상(B)": "badge-warning",
  질환의심: "badge-error",
} as const satisfies Record<MedicalCheckupEvaluation, string>;

export const Card = forwardRef<CardRef, CardProps>((props, ref) => {
  const { children, className, heading, description, evaluation, ...cardProps } = props;

  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-1", className)} ref={ref} {...cardProps}>
      <div className="card mb-2 bg-base-100 p-3 shadow-md">
        <div className="card-body p-2">
          {heading && (
            <div className="flex items-start justify-between">
              <h2 className="card-title text-lg">{heading}</h2>
            </div>
          )}

          {children}

          {evaluation && <div className={`badge ${badgeClasses[evaluation]} badge-sm`}>{evaluation}</div>}

          {description && <p className="text-sm text-base-content text-opacity-70">{description}</p>}
        </div>
      </div>
    </div>
  );
});

Card.displayName = "Card";
