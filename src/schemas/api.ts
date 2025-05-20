export type APISuccessResponse<Data> = {
  status: "success";
  data: Data;
};

export type APIErrorResponse = {
  status: "error";
  message: string;
  code: APIErrorCode;
};

export type APIErrorCode =
  | "AE-001"
  | "AE-002"
  | "AE-003"
  | "AE-004"
  | "AE-005"
  | "AE-006"
  | "AG-001"
  | "AG-002"
  | "AG-003"
  | "AT-001"
  | "AT-002"
  | "AT-003"
  | "AT-004"
  | "RE-001"
  | "TE-001"
  | "VE-001"
  | "VE-002"
  | "VE-003"
  | "VE-004"
  | "VE-006"
  | "VE-007"
  | "VE-008"
  | "VE-009"
  | "VE-010"
  | "VE-011"
  | "VE-012"
  | "VE-013"
  | "VE-014"
  | "VE-015"
  | "VE-016"
  | "VE-017"
  | "VE-018"
  | "VE-019"
  | "VE-020"
  | "VE-021"
  | "VE-023"
  | "SE-001"
  | "SE-002"
  | "SE-003"
  | "SE-004"
  | "SE-005"
  | "SE-006"
  | "SE-007"
  | "SE-008"
  | "SE-009"
  | "SE-010"
  | "SE-011"
  | "SE-012"
  | "DB-001"
  | "DB-002"
  | "DB-003";
