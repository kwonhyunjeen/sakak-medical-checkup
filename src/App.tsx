import { useState } from "react";
import { MedicalCheckupInquiry } from "./feature/MedicalCheckInquiry";
import type { MedialCheckupInfo } from "./schemas/medicalCheckup";
import { MedicalCheckResult } from "./feature/MedicalCheckResult";

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
    <>
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
    </>
  );
}

export default App;
