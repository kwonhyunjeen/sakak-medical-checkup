import { useState } from "react";
import {
  getMedicalCheckupHeight,
  getMedicalCheckupWeight,
  getMedicalCheckupWaist,
  getMedicalCheckupBMI,
  getMedicalCheckupVision,
  getMedicalCheckupHearing,
  getMedicalCheckupBloodPressure,
  getMedicalCheckupProteinuria,
  getMedicalCheckupHemoglobin,
  getMedicalCheckupFastingBloodGlucose,
  getMedicalCheckupTotalCholesterol,
  getMedicalCheckupHDLCholesterol,
  getMedicalCheckupLDLCholesterol,
  getMedicalCheckupTriglyceride,
  getMedicalCheckupSerumCreatinine,
  getMedicalCheckupGFR,
  getMedicalCheckupAST,
  getMedicalCheckupALT,
  getMedicalCheckupYGPT,
  getMedicalCheckupChestXrayResult,
  getMedicalCheckupOsteoporosis,
} from "../../policies/medicalCheckup";
import type { MedialCheckupInfo, MedicalCheckupResult, PatientGender } from "../../schemas/medicalCheckup";
import { Badge } from "../ui/Badge";
import { MetricCard } from "../ui/MetricCard";
import { Paper } from "../ui/Paper";
import { Tabs, TabsTrigger } from "../ui/Tabs";

type MedicalCheckResultProps = {
  medicalCheckupInfo: MedialCheckupInfo;
};

/** 성별 정보를 가져올 수 없기 때문에 하드 코딩 */
const GENDER: PatientGender = "female";

const getOrganizationName = (resultList: MedicalCheckupResult[], checkupDate: string) => {
  if (!resultList || resultList.length === 0) return "미상";

  // 일반 검진 결과에서 해당 날짜와 일치하는 정보 찾기
  const matchingResult = resultList.find(
    (result) => result.checkupDate === checkupDate && result.checkupType === "일반",
  );

  return matchingResult?.organizationName || resultList.at(0)?.organizationName || "미상";
};

export function MedicalCheckResult(props: MedicalCheckResultProps) {
  const { medicalCheckupInfo } = props;

  // 결과가 있는 년도 목록 (최신순 정렬)
  const years = medicalCheckupInfo.overviewList
    .map((result) => new Date(result.checkupDate).getFullYear())
    .filter((year, index, self) => self.indexOf(year) === index)
    .sort((a, b) => b - a);

  // 현재 선택된 년도 (기본값: 가장 최근 년도)
  const [selectedYear, setSelectedYear] = useState<number>(years.at(0) || new Date().getFullYear());

  // 선택된 년도의 검진 데이터 찾기
  const healthData = medicalCheckupInfo.overviewList.find(
    (item) => new Date(item.checkupDate).getFullYear() === selectedYear,
  );

  // 선택된 년도의 데이터가 없는 경우
  if (!healthData) {
    return <div className="alert alert-warning">선택한 년도의 검진 결과가 없습니다.</div>;
  }

  // 사용자 정보
  const patientName = medicalCheckupInfo.patientName;
  const gender = GENDER;

  const checkupDate = new Date(healthData.checkupDate);
  const formattedCheckupDate = checkupDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const organizationName = getOrganizationName(medicalCheckupInfo.resultList || [], healthData.checkupDate);

  const height = getMedicalCheckupHeight(healthData.height, medicalCheckupInfo.referenceList);
  const weight = getMedicalCheckupWeight(healthData.weight, medicalCheckupInfo.referenceList);
  const waist = getMedicalCheckupWaist(healthData.waist, gender, medicalCheckupInfo.referenceList);
  const bmi = getMedicalCheckupBMI(healthData.BMI, medicalCheckupInfo.referenceList);
  const vision = getMedicalCheckupVision(healthData.vision);
  const hearing = getMedicalCheckupHearing(healthData.hearing);
  const bloodPressure = getMedicalCheckupBloodPressure(healthData.bloodPressure, medicalCheckupInfo.referenceList);
  const proteinuria = getMedicalCheckupProteinuria(healthData.proteinuria);
  const hemoglobin = getMedicalCheckupHemoglobin(healthData.hemoglobin, gender, medicalCheckupInfo.referenceList);
  const fastingBloodGlucose = getMedicalCheckupFastingBloodGlucose(
    healthData.fastingBloodGlucose,
    medicalCheckupInfo.referenceList,
  );
  const totalCholesterol = getMedicalCheckupTotalCholesterol(
    healthData.totalCholesterol,
    medicalCheckupInfo.referenceList,
  );
  const hdlCholesterol = getMedicalCheckupHDLCholesterol(healthData.HDLCholesterol, medicalCheckupInfo.referenceList);
  const ldlCholesterol = getMedicalCheckupLDLCholesterol(healthData.LDLCholesterol, medicalCheckupInfo.referenceList);
  const triglyceride = getMedicalCheckupTriglyceride(healthData.triglyceride, medicalCheckupInfo.referenceList);
  const serumCreatinine = getMedicalCheckupSerumCreatinine(
    healthData.serumCreatinine,
    medicalCheckupInfo.referenceList,
  );
  const gfr = getMedicalCheckupGFR(healthData.GFR, medicalCheckupInfo.referenceList);
  const ast = getMedicalCheckupAST(healthData.AST, medicalCheckupInfo.referenceList);
  const alt = getMedicalCheckupALT(healthData.ALT, medicalCheckupInfo.referenceList);
  const yGPT = getMedicalCheckupYGPT(healthData.yGPT, gender, medicalCheckupInfo.referenceList);
  const chestXrayResult = getMedicalCheckupChestXrayResult(healthData.chestXrayResult);
  const osteoporosis = getMedicalCheckupOsteoporosis(healthData.osteoporosis);

  return (
    <>
      {/* 년도 선택 탭 */}
      {years.length > 1 && (
        <Paper className="mb-8 p-2">
          <Tabs>
            {years.map((year) => (
              <TabsTrigger key={year} selected={year === selectedYear} onClick={() => setSelectedYear(year)}>
                {year}년
              </TabsTrigger>
            ))}
          </Tabs>
        </Paper>
      )}

      <div className="mb-6 p-1">
        <h2 className="mb-2 text-3xl font-semibold">
          {patientName}님의 {selectedYear}년 건강검진 결과
        </h2>
        <div className="flex flex-wrap gap-2">
          <Badge>검진일: {formattedCheckupDate}</Badge>
          <Badge>검진기관: {organizationName}</Badge>
          <Badge>판정: {healthData.evaluation}</Badge>
        </div>
      </div>

      <h3 className="mb-4 mt-10 text-2xl font-semibold">신체계측</h3>
      <div className="columns-1 gap-4 sm:columns-2">
        <MetricCard className="mb-4 break-inside-avoid" name="신장" level={height.level} unit={height.unit} />
        <MetricCard className="mb-4 break-inside-avoid" name="체중" level={weight.level} unit={weight.unit} />
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="허리둘레"
          level={waist.level}
          unit={waist.unit}
          evaluation={waist.evaluation}
        />
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="시력 (좌/우)"
          level={`${vision.level.left} / ${vision.level.right}`}
        />
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="청력 (좌/우)"
          level={`${hearing.level.left} / ${hearing.level.right}`}
        />
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="체질량지수"
          level={bmi.level}
          unit={bmi.unit}
          evaluation={bmi.evaluation}
        />
      </div>

      <h3 className="mb-4 mt-10 text-2xl font-semibold">고혈압 등</h3>
      <div className="columns-1 gap-4">
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="혈압 (수축기/이완기)"
          level={`${bloodPressure.level.systolic} / ${bloodPressure.level.diastolic}`}
          unit={bloodPressure.unit}
          evaluation={bloodPressure.evaluation}
        />
      </div>

      <h3 className="mb-4 mt-10 text-2xl font-semibold">빈혈 등</h3>
      <div className="columns-1 gap-4">
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="혈색소"
          level={hemoglobin.level}
          unit={hemoglobin.unit}
          evaluation={hemoglobin.evaluation}
        />
      </div>

      <h3 className="mb-4 mt-10 text-2xl font-semibold">당뇨병</h3>
      <div className="columns-1 gap-4">
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="공복혈당"
          level={fastingBloodGlucose.level}
          unit={fastingBloodGlucose.unit}
          evaluation={fastingBloodGlucose.evaluation}
        />
      </div>

      <h3 className="mb-4 mt-10 text-2xl font-semibold">콜레스테롤</h3>
      <div className="columns-1 gap-4 sm:columns-2">
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="총 콜레스테롤"
          level={totalCholesterol.level}
          unit={totalCholesterol.unit}
          evaluation={totalCholesterol.evaluation}
        />
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="HDL-C"
          level={hdlCholesterol.level}
          unit={hdlCholesterol.unit}
          evaluation={hdlCholesterol.evaluation}
        />
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="LDL-C"
          level={ldlCholesterol.level}
          unit={ldlCholesterol.unit}
          evaluation={ldlCholesterol.evaluation}
        />
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="중성지방"
          level={triglyceride.level}
          unit={triglyceride.unit}
          evaluation={triglyceride.evaluation}
        />
      </div>

      <h3 className="mb-4 mt-10 text-2xl font-semibold">간장질환</h3>
      <div className="columns-1 gap-4 sm:columns-2">
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="AST(SGOT)"
          level={ast.level}
          unit={ast.unit}
          evaluation={ast.evaluation}
        />
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="ALT(SGPT)"
          level={alt.level}
          unit={alt.unit}
          evaluation={alt.evaluation}
        />
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="감마지피티(y-GPT)"
          level={yGPT.level}
          unit={yGPT.unit}
          evaluation={yGPT.evaluation}
        />
      </div>

      <h3 className="mb-4 mt-10 text-2xl font-semibold">신장질환</h3>
      <div className="columns-1 gap-4 sm:columns-2">
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="요단백"
          level={proteinuria.level}
          evaluation={proteinuria.evaluation}
        />
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="신사구체여과율(GFR)"
          level={gfr.level}
          unit={gfr.unit}
          evaluation={gfr.evaluation}
        />
      </div>

      <h3 className="mb-4 mt-10 text-2xl font-semibold">만성신장질환</h3>
      <div className="columns-1 gap-4">
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="혈청크레아티닌"
          level={serumCreatinine.level}
          unit={serumCreatinine.unit}
          evaluation={serumCreatinine.evaluation}
        />
      </div>

      <h3 className="mb-4 mt-10 text-2xl font-semibold">페결핵 / 흉부질환</h3>
      <div className="columns-1 gap-4">
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="흉부방사선검사"
          level={chestXrayResult.level}
          evaluation={chestXrayResult.evaluation}
        />
      </div>

      <h3 className="mb-4 mt-10 text-2xl font-semibold">골밀도검사</h3>
      <div className="columns-1 gap-4">
        <MetricCard
          className="mb-4 break-inside-avoid"
          name="골다공증"
          level={osteoporosis.level}
          evaluation={osteoporosis.evaluation}
        />
      </div>

      <div className="h-24" />
    </>
  );
}
