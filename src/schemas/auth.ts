export type LoginTypeLevel =
  | "1" // 카카오톡
  | "2" // 페이코
  | "3" // 삼성패스
  | "4" // 국민은행(국민인증서)
  | "5" // 통신사(PASS)
  | "6" // 네이버
  | "7" // 신한은행(신한인증서)
  | "8" // 토스
  | "9" // 뱅크샐러드
  | "10" // 하나은행(하나인증서)
  | "11"; // NH모바일인증서

export type Telecom =
  | "0" // SKT (SKT 알뜰폰)
  | "1" // KT (KT 알뜰폰)
  | "2"; // LG U+ (LG U+ 알뜰폰)

export type MultiFactorInfo = {
  transactionId: string;
  jobIndex: number;
  threadIndex: number;
  multiFactorTimestamp: number;
};
