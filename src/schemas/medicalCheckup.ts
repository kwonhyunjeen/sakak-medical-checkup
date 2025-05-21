export type InquiryType =
  | "0" // 건강검진 일반조회
  | "1" // 건강검진 상세조회(PDF파일포함)
  | "3" // 상세조회(PDF파일포함)+문진결과(jsonData)
  | "4"; // 문진결과(jsonData)

export type MedialCheckupInfo = {
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
};
