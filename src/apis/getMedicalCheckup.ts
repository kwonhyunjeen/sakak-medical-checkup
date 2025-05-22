import type { APISuccessResponse } from "../schemas/api";
import type { LoginTypeLevel, MultiFactorInfo, Telecom } from "../schemas/auth";
import type { InquiryType, MedialCheckupInfo } from "../schemas/medicalCheckup";

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

export type GetMedicalCheckupAPIResponseBody = APISuccessResponse<MedialCheckupInfo>;

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
  const json = await response.json();
  if (!response.ok) {
    throw json;
  }
  return json;
};
