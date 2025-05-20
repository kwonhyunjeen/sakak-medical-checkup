import type { APISuccessResponse } from "../schemas/api";
import type { LoginTypeLevel, MultiFactorInfo, Telecom } from "../schemas/auth";
import type { InquiryType } from "../schemas/medicalCheckup";

export type RequestMedicalCheckupAuthAPIRequestBody = {
  id: string;
  loginTypeLevel: LoginTypeLevel;
  legalName: string;
  birthdate: string;
  phoneNo: string;
  telecom: Telecom;
  startDate: string;
  endDate: string;
  inquiryType?: InquiryType;
  isContinue: "0"; // Cancel
};

export type RequestMedicalCheckupAuthAPIResponseBody = APISuccessResponse<MultiFactorInfo>;
