export type InquiryType =
  | "0" // 건강검진 일반조회
  | "1" // 건강검진 상세조회(PDF파일포함)
  | "3" // 상세조회(PDF파일포함)+문진결과(jsonData)
  | "4"; // 문진결과(jsonData)
