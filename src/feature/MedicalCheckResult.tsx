import type { MedialCheckupInfo } from "../schemas/medicalCheckup";

type MedicalCheckResultProps = {
  medicalCheckupInfo: MedialCheckupInfo;
};

export function MedicalCheckResult(props: MedicalCheckResultProps) {
  const { medicalCheckupInfo } = props;

  return (
    <div className="mx-auto max-w-sm p-4">
      <h2>
        <code>건강검진결과</code>:
      </h2>
      <pre>
        <code>{JSON.stringify(medicalCheckupInfo)}</code>
      </pre>
    </div>
  );
}
