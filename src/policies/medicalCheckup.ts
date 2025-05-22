import type {
  MedicalCheckupOverview,
  MedicalCheckupReference,
  MedicalCheckupEvaluationReference,
  MedicalCheckupUnitReference,
  MedicalCheckupEvaluation,
  PatientGender,
} from "../schemas/medicalCheckup";

type ProcessedMedicalCheckupValue = {
  // 빈 값을 0으로 표기해서는 안되므로 number 대신 string으로 설정
  level: string | Record<string, string | undefined>;
  unit?: string;
  evaluation?: MedicalCheckupEvaluation;
};

const separateMedicalCheckupReferences = <References extends Pick<MedicalCheckupReference, "refType">>(
  references: References[],
) => {
  const evaluationReferences = references.filter((item) => item.refType !== "단위") as (
    | References
    | MedicalCheckupEvaluationReference
  )[];
  const unitReference = references.find((item) => item.refType === "단위") as References | MedicalCheckupUnitReference;
  if (!unitReference) {
    throw new Error("참조할 단위 정보가 없습니다.");
  }
  return {
    evaluationReferences,
    unitReference,
  };
};

/** 키 정보 가공 함수 */
export const getMedicalCheckupHeight = (
  height: MedicalCheckupOverview["height"],
  references: Pick<MedicalCheckupReference, "refType" | "height">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.height;
  const level = height.trim() || "-";
  return {
    level,
    unit,
  } satisfies ProcessedMedicalCheckupValue;
};

/** 몸무게 정보 가공 함수 */
export const getMedicalCheckupWeight = (
  weight: MedicalCheckupOverview["weight"],
  references: Pick<MedicalCheckupReference, "refType" | "weight">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.weight;
  const level = weight.trim() || "-";
  return {
    level,
    unit,
  } satisfies ProcessedMedicalCheckupValue;
};

/** 허리둘레 정보 가공 함수 */
export const getMedicalCheckupWaist = (
  waist: string,
  gender: PatientGender,
  references: Pick<MedicalCheckupReference, "refType" | "waist">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.waist;
  const level = waist.trim() || "-";
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const value = Number(waist);
    if (gender === "male" ? value < 90 : value < 85) {
      return "질환의심";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** BMI 정보 가공 함수 */
export const getMedicalCheckupBMI = (bmi: string, references: Pick<MedicalCheckupReference, "refType" | "BMI">[]) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.BMI;
  const level = bmi.trim() || "-";
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const value = Number(bmi);
    if (value >= 30) {
      return "질환의심";
    }
    if (value >= 25 || value < 18.5) {
      return "정상(B)";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** 시력 정보 가공 함수 */
export const getMedicalCheckupVision = (
  vision: string,
  // references: Pick<MedicalCheckupReference, "refType" | "vision">[],
) => {
  const [left = "-", right = "-"] = vision.trim().split("/");
  return {
    level: { left, right },
  } satisfies ProcessedMedicalCheckupValue;
};

/** 청력 정보 가공 함수 */
export const getMedicalCheckupHearing = (
  hearing: string,
  // references: Pick<MedicalCheckupReference, "refType" | "hearing">[],
) => {
  const [left = "-", right = "-"] = hearing.trim().split("/");
  return {
    level: { left, right },
  } satisfies ProcessedMedicalCheckupValue;
};

/** 혈압 정보 가공 함수 */
export const getMedicalCheckupBloodPressure = (
  bloodPressure: string,
  references: Pick<MedicalCheckupReference, "refType" | "bloodPressure">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.bloodPressure;
  const [systolic = "-", diastolic = "-"] = bloodPressure.trim().split("/");
  const systolicLevel = systolic.trim() || "-";
  const diastolicLevel = diastolic.trim() || "-";
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const systolicValue = Number(systolic);
    const diastolicValue = Number(diastolic);
    if (systolicValue >= 140 || diastolicValue >= 90) {
      return "질환의심";
    }
    if (systolicValue >= 120 || diastolicValue >= 80) {
      return "정상(B)";
    }
    return "정상(A)";
  })();
  return {
    level: { systolic: systolicLevel, diastolic: diastolicLevel },
    unit,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** 단백뇨 정보 가공 함수 */
export const getMedicalCheckupProteinuria = (
  proteinuria: string,
  // references: Pick<MedicalCheckupReference, "refType" | "proteinuria">[],
) => {
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    if (proteinuria.includes("양성")) {
      return "질환의심";
    }
    if (proteinuria.includes("약양성")) {
      return "정상(B)";
    }
    return "정상(A)";
  })();
  return {
    level: proteinuria,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** 혈색소 정보 가공 함수 */
export const getMedicalCheckupHemoglobin = (
  hemoglobin: string,
  gender: PatientGender,
  references: Pick<MedicalCheckupReference, "refType" | "hemoglobin">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.hemoglobin;
  const level = hemoglobin.trim() || "-";
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const value = Number(hemoglobin);
    if (gender === "male" ? value < 12 : value < 10) {
      return "질환의심";
    }
    if (gender === "male" ? value < 13 : value < 12) {
      return "정상(B)";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** 혈당 정보 가공 함수 */
export const getMedicalCheckupFastingBloodGlucose = (
  fastingBloodGlucose: string,
  references: Pick<MedicalCheckupReference, "refType" | "fastingBloodGlucose">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.fastingBloodGlucose;
  const level = fastingBloodGlucose.trim() || "-";
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const value = Number(fastingBloodGlucose);
    if (value >= 126) {
      return "질환의심";
    }
    if (value >= 100) {
      return "정상(B)";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** 총 콜레스테롤 정보 가공 함수 */
export const getMedicalCheckupTotalCholesterol = (
  totalCholesterol: string,
  references: Pick<MedicalCheckupReference, "refType" | "totalCholesterol">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.totalCholesterol;
  const level = totalCholesterol.trim() || "-";
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const value = Number(totalCholesterol);
    if (value >= 240) {
      return "질환의심";
    }
    if (value >= 200) {
      return "정상(B)";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** HDL 콜레스테롤 정보 가공 함수 */
export const getMedicalCheckupHDLCholesterol = (
  hdlCholesterol: string,
  references: Pick<MedicalCheckupReference, "refType" | "HDLCholesterol">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.HDLCholesterol;
  const level = hdlCholesterol.trim() || "-";
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const value = Number(hdlCholesterol);
    if (value < 40) {
      return "질환의심";
    }
    if (value < 60) {
      return "정상(B)";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** LDL 콜레스테롤 정보 가공 함수 */
export const getMedicalCheckupLDLCholesterol = (
  ldlCholesterol: string,
  references: Pick<MedicalCheckupReference, "refType" | "LDLCholesterol">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.LDLCholesterol;
  const level = ldlCholesterol.trim() || "-";
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const value = Number(ldlCholesterol);
    if (value >= 160) {
      return "질환의심";
    }
    if (value >= 130) {
      return "정상(B)";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** 중성지방 정보 가공 함수 */
export const getMedicalCheckupTriglyceride = (
  triglyceride: string,
  references: Pick<MedicalCheckupReference, "refType" | "triglyceride">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.triglyceride;
  const level = triglyceride.trim() || "-";
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const value = Number(triglyceride);
    if (value >= 200) {
      return "질환의심";
    }
    if (value >= 150) {
      return "정상(B)";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** 혈청크레아티닌 정보 가공 함수 */
export const getMedicalCheckupSerumCreatinine = (
  serumCreatinine: string,
  references: Pick<MedicalCheckupReference, "refType" | "serumCreatinine">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.serumCreatinine;
  const level = serumCreatinine.trim() || "-";
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const value = Number(serumCreatinine);
    if (value >= 1.6) {
      return "질환의심";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** 신사구체여과율(GFR) 정보 가공 함수 */
export const getMedicalCheckupGFR = (gfr: string, references: Pick<MedicalCheckupReference, "refType" | "GFR">[]) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.GFR;
  const level = gfr.trim() || "-";
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const value = Number(gfr);
    if (value < 60) {
      return "질환의심";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** AST(SGOT) 정보 가공 함수 */
export const getMedicalCheckupAST = (ast: string, references: Pick<MedicalCheckupReference, "refType" | "AST">[]) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.AST;
  const level = ast.trim() || "-";
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const value = Number(ast);
    if (value >= 51) {
      return "질환의심";
    }
    if (value >= 41) {
      return "정상(B)";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** ALT(SGPT) 정보 가공 함수 */
export const getMedicalCheckupALT = (alt: string, references: Pick<MedicalCheckupReference, "refType" | "ALT">[]) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.ALT;
  const level = alt.trim() || "-";
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const value = Number(alt);
    if (value >= 46) {
      return "질환의심";
    }
    if (value >= 36) {
      return "정상(B)";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  };
};

/** 감마지피티(y-GPT) 정보 가공 함수 */
export const getMedicalCheckupYGPT = (
  yGPT: string,
  gender: PatientGender,
  references: Pick<MedicalCheckupReference, "refType" | "yGPT">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.yGPT;
  const level = yGPT.trim() || "-";
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const value = Number(yGPT);
    if (gender === "male" ? value >= 78 : value >= 46) {
      return "질환의심";
    }
    if (gender === "male" ? value >= 64 : value >= 36) {
      return "정상(B)";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** 흉부질환 정보 가공 함수 */
export const getMedicalCheckupChestXrayResult = (
  chestXrayResult: string,
  // references: Pick<MedicalCheckupReference, "refType" | "chestXrayResult">[],
) => {
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    if (!chestXrayResult.includes("정상") && !chestXrayResult.includes("비활동성")) {
      return "질환의심";
    }
    return "정상(A)";
  })();
  return {
    level: chestXrayResult,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};

/** 골다공증 정보 가공 함수 */
export const getMedicalCheckupOsteoporosis = (
  osteoporosis: string,
  // references: Pick<MedicalCheckupReference, "refType" | "osteoporosis">[],
) => {
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    if (osteoporosis.includes("질환의심")) {
      return "질환의심";
    }
    if (osteoporosis.includes("정상(B)")) {
      return "정상(B)";
    }
    return "정상(A)";
  })();
  return {
    level: osteoporosis,
    evaluation,
  } satisfies ProcessedMedicalCheckupValue;
};
