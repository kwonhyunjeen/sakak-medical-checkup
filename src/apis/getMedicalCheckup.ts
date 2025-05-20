import type { APISuccessResponse } from "../schemas/api";
import type { LoginTypeLevel, MultiFactorInfo, Telecom } from "../schemas/auth";
import type { InquiryType } from "../schemas/medicalCheckup";

export type GetMedicalCheckupAPIRequestBody = {
  id: string;
  loginTypeLevel: LoginTypeLevel;
  legalName: string;
  birthdate: string;
  phoneNo: string;
  telecom: Telecom;
  startDate: string;
  endDate: string;
  inquiryType?: InquiryType;
  multiFactorInfo: MultiFactorInfo;
};

export type GetMedicalCheckupAPIResponseBody = APISuccessResponse<{
  patientName: string;
  overviewList: {
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
  }[];
  referenceList: {
    refType: string;
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
  }[];
  resultList: {
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
  }[];
}>;

export const getMedicalCheckup = async (
  body: GetMedicalCheckupAPIRequestBody,
): Promise<GetMedicalCheckupAPIResponseBody> => {
  const response = await fetch("/candiy-api/v1/nhis/checkup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_CANDIY_API_KEY,
    },
    body: JSON.stringify({
      ...body,
      isContinue: "1", // OK
    }),
  });
  return (await response.json()) as GetMedicalCheckupAPIResponseBody;
};
