import { useState } from "react";
import { MedicalCheckupInquiry } from "./components/feature/MedicalCheckInquiry";
import { MedicalCheckResult } from "./components/feature/MedicalCheckResult";
import type { MedialCheckupInfo } from "./schemas/medicalCheckup";

type FormStep = {
  type: "form";
};

type ResultStep = {
  type: "result";
  data: {
    medicalCheckupInfo: MedialCheckupInfo;
  };
};

type Step = FormStep | ResultStep;

function App() {
  const [step, setStep] = useState<Step>({ type: "form" });

  return (
    <div className="mx-auto max-w-3xl p-8">
      {step.type === "form" && (
        <MedicalCheckupInquiry
          onComplete={(result) =>
            setStep({
              type: "result",
              data: { medicalCheckupInfo: result },
            })
          }
        />
      )}
      {step.type === "result" && <MedicalCheckResult medicalCheckupInfo={step.data.medicalCheckupInfo} />}
    </div>
  );
}

export default App;
