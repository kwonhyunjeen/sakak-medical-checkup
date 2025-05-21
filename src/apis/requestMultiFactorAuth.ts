import type { APISuccessResponse } from "../schemas/api";
import type { LoginTypeLevel, MultiFactorInfo, Telecom } from "../schemas/auth";
import type { InquiryType } from "../schemas/medicalCheckup";

export type RequestMultiFactorAuthAPIRequestBody = {
  id: string;
  loginTypeLevel: LoginTypeLevel;
  legalName: string;
  birthdate: string;
  phoneNo: string;
  telecom: Telecom;
  startDate: string;
  endDate: string;
  inquiryType?: InquiryType;
};

export type RequestMultiFactorAuthAPIResponseBody = APISuccessResponse<MultiFactorInfo>;

export const requestMultiFactorAuth = async (
  body: RequestMultiFactorAuthAPIRequestBody,
): Promise<RequestMultiFactorAuthAPIResponseBody> => {
  const response = await fetch("/candiy-api/v1/nhis/checkup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_CANDIY_API_KEY,
    },
    body: JSON.stringify({
      ...body,
      isContinue: "0", // Cancel
    }),
  });
  return (await response.json()) as RequestMultiFactorAuthAPIResponseBody;
};
