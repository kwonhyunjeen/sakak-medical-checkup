import type {
  MedicalCheckupOverview,
  MedicalCheckupReference,
  MedicalCheckupEvaluationReference,
  MedicalCheckupUnitReference,
  MedicalCheckupEvaluation,
  PatientGender,
} from "../schemas/medicalCheckup";

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
  const level = Number(height);
  return {
    level,
    unit,
  };
};

/** 몸무게 정보 가공 함수 */
export const getMedicalCheckupWeight = (
  weight: MedicalCheckupOverview["weight"],
  references: Pick<MedicalCheckupReference, "refType" | "weight">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.weight;
  const level = Number(weight);
  return {
    level,
    unit,
  };
};

/** 허리둘레 정보 가공 함수 */
export const getMedicalCheckupWaist = (
  waist: string,
  gender: PatientGender,
  references: Pick<MedicalCheckupReference, "refType" | "waist">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.waist;
  const level = Number(waist);
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const condition = gender === "male" ? level < 90 : level < 85;
    return condition ? "질환의심" : "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  };
};

/** BMI 정보 가공 함수 */
export const getMedicalCheckupBMI = (bmi: string, references: Pick<MedicalCheckupReference, "refType" | "BMI">[]) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.BMI;
  const level = Number(bmi);
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    if (level >= 30) {
      return "질환의심";
    }
    if (level >= 25 || level < 18.5) {
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

/** 시력 정보 가공 함수 */
export const getMedicalCheckupVision = (
  vision: string,
  // references: Pick<MedicalCheckupReference, "refType" | "vision">[],
) => {
  const [left, right] = vision.trim().split("/");
  return {
    left,
    right,
  };
};

/** 청력 정보 가공 함수 */
export const getMedicalCheckupHearing = (
  hearing: string,
  // references: Pick<MedicalCheckupReference, "refType" | "hearing">[],
) => {
  const [left, right] = hearing.trim().split("/");
  return {
    left,
    right,
  };
};

/** 혈압 정보 가공 함수 */
export const getMedicalCheckupBloodPressure = (
  bloodPressure: string,
  references: Pick<MedicalCheckupReference, "refType" | "bloodPressure">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.bloodPressure;
  const [systolic = 0, diastolic = 0] = bloodPressure.trim().split("/");
  const systolicLevel = Number(systolic);
  const diastolicLevel = Number(diastolic);
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    if (systolicLevel >= 140 || diastolicLevel >= 90) {
      return "질환의심";
    }
    if (systolicLevel >= 120 || diastolicLevel >= 80) {
      return "정상(B)";
    }
    return "정상(A)";
  })();
  return {
    systolic: systolicLevel,
    diastolic: diastolicLevel,
    unit,
    evaluation,
  };
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
  };
};

/** 혈색소 정보 가공 함수 */
export const getMedicalCheckupHemoglobin = (
  hemoglobin: string,
  gender: PatientGender,
  references: Pick<MedicalCheckupReference, "refType" | "hemoglobin">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.hemoglobin;
  const level = Number(hemoglobin);
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const condition1 = gender === "male" ? level < 12 : level < 10;
    const condition2 = gender === "male" ? level < 13 : level < 12;
    if (condition1) {
      return "질환의심";
    }
    if (condition2) {
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

/** 혈당 정보 가공 함수 */
export const getMedicalCheckupFastingBloodGlucose = (
  fastingBloodGlucose: string,
  references: Pick<MedicalCheckupReference, "refType" | "fastingBloodGlucose">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.fastingBloodGlucose;
  const level = Number(fastingBloodGlucose);
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    if (level >= 126) {
      return "질환의심";
    }
    if (level >= 100) {
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

/** 총 콜레스테롤 정보 가공 함수 */
export const getMedicalCheckupTotalCholesterol = (
  totalCholesterol: string,
  references: Pick<MedicalCheckupReference, "refType" | "totalCholesterol">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.totalCholesterol;
  const level = Number(totalCholesterol);
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    if (level >= 240) {
      return "질환의심";
    }
    if (level >= 200) {
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

/** HDL 콜레스테롤 정보 가공 함수 */
export const getMedicalCheckupHDLCholesterol = (
  hdlCholesterol: string,
  references: Pick<MedicalCheckupReference, "refType" | "HDLCholesterol">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.HDLCholesterol;
  const level = Number(hdlCholesterol);
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    if (level < 40) {
      return "질환의심";
    }
    if (level < 60) {
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

/** LDL 콜레스테롤 정보 가공 함수 */
export const getMedicalCheckupLDLCholesterol = (
  ldlCholesterol: string,
  references: Pick<MedicalCheckupReference, "refType" | "LDLCholesterol">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.LDLCholesterol;
  const level = Number(ldlCholesterol);
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    if (level >= 160) {
      return "질환의심";
    }
    if (level >= 130) {
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

/** 중성지방 정보 가공 함수 */
export const getMedicalCheckupTriglyceride = (
  triglyceride: string,
  references: Pick<MedicalCheckupReference, "refType" | "triglyceride">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.triglyceride;
  const level = Number(triglyceride);
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    if (level >= 200) {
      return "질환의심";
    }
    if (level >= 150) {
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

/** 혈청크레아티닌 정보 가공 함수 */
export const getMedicalCheckupSerumCreatinine = (
  serumCreatinine: string,
  references: Pick<MedicalCheckupReference, "refType" | "serumCreatinine">[],
) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.serumCreatinine;
  const level = Number(serumCreatinine);
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    if (level >= 1.6) {
      return "질환의심";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  };
};

/** 신사구체여과율(GFR) 정보 가공 함수 */
export const getMedicalCheckupGFR = (gfr: string, references: Pick<MedicalCheckupReference, "refType" | "GFR">[]) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.GFR;
  const level = Number(gfr);
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    if (level < 60) {
      return "질환의심";
    }
    return "정상(A)";
  })();
  return {
    level,
    unit,
    evaluation,
  };
};

/** AST(SGOT) 정보 가공 함수 */
export const getMedicalCheckupAST = (ast: string, references: Pick<MedicalCheckupReference, "refType" | "AST">[]) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.AST;
  const level = Number(ast);
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    if (level >= 51) {
      return "질환의심";
    }
    if (level >= 41) {
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
/** ALT(SGPT) 정보 가공 함수 */
export const getMedicalCheckupALT = (alt: string, references: Pick<MedicalCheckupReference, "refType" | "ALT">[]) => {
  const { unitReference } = separateMedicalCheckupReferences(references);
  const unit = unitReference.ALT;
  const level = Number(alt);
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    if (level >= 46) {
      return "질환의심";
    }
    if (level >= 36) {
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
  const level = Number(yGPT);
  /** @todo evaluationReferences 문자열을 가공해서 활용하도록 리팩토링 */
  const evaluation: MedicalCheckupEvaluation = (() => {
    const condition1 = gender === "male" ? level >= 78 : level >= 46;
    const condition2 = gender === "male" ? level >= 64 : level >= 36;
    if (condition1) {
      return "질환의심";
    }
    if (condition2) {
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
  };
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
  };
};
