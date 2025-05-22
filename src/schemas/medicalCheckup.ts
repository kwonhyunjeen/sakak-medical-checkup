export type InquiryType =
  | "0" // 건강검진 일반조회
  | "1" // 건강검진 상세조회(PDF파일포함)
  | "3" // 상세조회(PDF파일포함)+문진결과(jsonData)
  | "4"; // 문진결과(jsonData)

export type PatientGender = "male" | "female";

export type MedicalCheckupEvaluation = "정상(A)" | "정상(B)" | "질환의심";

/** @todo 문서와 값 형태가 다름 ("정상A", "정상B") */
export type MedicalCheckupOverviewEvaluation =
  | "정A"
  | "정B"
  | "주의"
  | "의심"
  | "고∙당"
  | "유질"
  | "일반"
  | "직업"
  | "단순"
  | "휴무";

export type MedicalCheckupOverview = {
  checkupDate: string;
  height: string;
  weight: string;
  /** @todo 문서와 프로퍼티명이 다름 (waists) */
  waist: string;
  BMI: string;
  vision: string;
  hearing: string;
  bloodPressure: string;
  proteinuria: string;
  hemoglobin: string;
  fastingBloodGlucose: string;
  totalCholesterol: string;
  HDLCholesterol: string;
  triglyceride: string;
  LDLCholesterol: string;
  serumCreatinine: string;
  GFR: string;
  AST: string;
  ALT: string;
  yGPT: string;
  chestXrayResult: string;
  osteoporosis: string;
  evaluation: string;
};

export type MedicalCheckupUnitReference = {
  refType: "단위";
  height: string;
  weight: string;
  /** @todo 문서와 프로퍼티명이 다름 (waists) */
  waist: string;
  BMI: string;
  vision: string;
  hearing: string;
  bloodPressure: string;
  proteinuria: string;
  hemoglobin: string;
  fastingBloodGlucose: string;
  totalCholesterol: string;
  HDLCholesterol: string;
  triglyceride: string;
  LDLCholesterol: string;
  serumCreatinine: string;
  GFR: string;
  AST: string;
  ALT: string;
  yGPT: string;
  chestXrayResult: string;
  osteoporosis: string;
};

export type MedicalCheckupEvaluationReference = {
  refType: MedicalCheckupEvaluation;
  height: string;
  weight: string;
  /** @todo 문서와 프로퍼티명이 다름 (waists) */
  waist: string;
  BMI: string;
  vision: string;
  hearing: string;
  bloodPressure: string;
  proteinuria: string;
  hemoglobin: string;
  fastingBloodGlucose: string;
  totalCholesterol: string;
  HDLCholesterol: string;
  triglyceride: string;
  LDLCholesterol: string;
  serumCreatinine: string;
  GFR: string;
  AST: string;
  ALT: string;
  yGPT: string;
  chestXrayResult: string;
  osteoporosis: string;
};

export type MedicalCheckupReference = MedicalCheckupUnitReference | MedicalCheckupEvaluationReference;

export type MedicalCheckupResult = {
  /** @todo 문서와 타입이 다름 (string) */
  caseType: number;
  checkupType: string;
  checkupDate: string;
  organizationName: string;
  pdfData: string;
  questionnaire: unknown[];
  /** @todo 문서에 존재하지 않음 */
  infantsCheckupList: unknown[];
  /** @todo 문서에 존재하지 않음 */
  infantsDentalList: unknown[];
};

export type MedialCheckupInfo = {
  patientName: string;
  overviewList: MedicalCheckupOverview[];
  referenceList: MedicalCheckupReference[];
  resultList: MedicalCheckupResult[];
};
