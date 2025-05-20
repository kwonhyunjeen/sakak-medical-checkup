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
  isContinue?: "1"; // OK
  multiFactorInfo: MultiFactorInfo;
};

export type GetMedicalCheckupAPIResponseBody = APISuccessResponse<{
  patientName: string;
  overviewList: {
    checkupDate: string;
    height: string;
    weight: string;
    waists: string;
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
    waists: string;
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
    caseType: string;
    checkupType: string;
    checkupDate: string;
    organizationName: string;
    pdfData: string;
    questionnaire: unknown[];
  }[];
}>;
