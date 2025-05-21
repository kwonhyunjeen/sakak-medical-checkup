import { requestMultiFactorAuth } from "./apis/requestMultiFactorAuth";
import { getMedicalCheckup } from "./apis/getMedicalCheckup";
import { TextField } from "./components/ui/TextField";
import { Select, SelectOption } from "./components/ui/Select";
import { Button } from "./components/ui/Button";
import { Alert } from "./components/ui/Alert";
import { startTransition, useActionState } from "react";
import type { APIErrorResponse } from "./schemas/api";
import type { LoginTypeLevel, Telecom } from "./schemas/auth";
import { useForm } from "react-hook-form";

interface FormValues {
  loginTypeLevel: LoginTypeLevel;
  legalName: string;
  birthdate: string;
  phoneNo: string;
  telecom: Telecom;
  startDate: string;
  endDate: string;
}

// 식별 가능한 사용자 계정이나 로그인 세션이 없기 때문에 페이지 세션마다 랜덤 생성
const MFA_SESSION_ID = (() => {
  const id = sessionStorage.getItem("MFA_SESSION_ID");
  if (id == undefined) {
    const randomId = Math.random().toString(36).slice(2, 15);
    sessionStorage.setItem("MFA_SESSION_ID", randomId);
    return randomId;
  }
  return id;
})();

const currentYear = new Date().getFullYear();
// 건강검진 결과는 최근 10년 간 확인 가능
const yearOptions = Array.from({ length: 10 }, (_, index) => String(currentYear - index));

function App() {
  const {
    register,
    getValues,
    formState: { errors, isDirty },
    handleSubmit,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      loginTypeLevel: "1",
      legalName: "",
      birthdate: "",
      phoneNo: "",
      telecom: "1",
      startDate: yearOptions.at(1) ?? "",
      endDate: yearOptions.at(0) ?? "",
    },
    mode: "onBlur",
  });

  const startYear = watch("startDate");

  const [mfaResponse, dispatchMFA, isMFAPending] = useActionState(async () => {
    try {
      return await requestMultiFactorAuth({
        ...getValues(),
        id: MFA_SESSION_ID,
      });
    } catch (error) {
      return error as APIErrorResponse;
    }
  }, undefined);

  const [medicalCheckupResponse, dispatchMedicalCheckup, isMedicalCheckupPending] = useActionState(async () => {
    try {
      if (mfaResponse?.status !== "success") {
        throw {
          status: "error",
          message: "본인인증 절차가 완료되지 않았습니다. 먼저 본인인증을 완료해주세요.",
          code: "FRONTEND-999",
        } satisfies APIErrorResponse;
      }
      return await getMedicalCheckup({
        ...getValues(),
        id: MFA_SESSION_ID,
        multiFactorInfo: mfaResponse.data,
      });
    } catch (error) {
      return error as APIErrorResponse;
    }
  }, undefined);

  const handleMFAFormSubmit = () => {
    // See https://github.com/facebook/react/pull/28491#issuecomment-2611895077
    startTransition(() => {
      dispatchMFA();
    });
  };

  const handleMFACompleteClick = () => {
    // See https://github.com/facebook/react/pull/28491#issuecomment-2611895077
    startTransition(() => {
      dispatchMedicalCheckup();
    });
  };

  return (
    <div className="mx-auto max-w-sm p-4">
      {mfaResponse?.status === "error" && <Alert variant="error">{mfaResponse.message}</Alert>}
      {medicalCheckupResponse?.status === "error" && <Alert variant="error">{medicalCheckupResponse.message}</Alert>}
      <form onSubmit={handleSubmit(handleMFAFormSubmit)}>
        <TextField
          label="이름"
          placeholder="홍길동"
          {...register("legalName", {
            required: "이름을 입력해주세요.",
            validate: (value) => {
              const isValid = /^[가-힣a-zA-Z]{2,20}$/.test(value);
              return isValid || "2~20자의 한글 또는 영문으로 입력해주세요.";
            },
          })}
          error={errors.legalName?.message}
        />
        <TextField
          label="생년월일"
          placeholder="YYYYMMDD"
          inputMode="numeric"
          {...register("birthdate", {
            required: "생년월일을 입력해주세요.",
            pattern: {
              value: /^\d{8}$/,
              message: "YYYYMMDD 형식의 8자리 숫자로 입력해주세요.",
            },
          })}
          error={errors.birthdate?.message}
        />
        <TextField
          label="휴대폰 번호"
          placeholder="'-' 없이 번호만 입력"
          inputMode="numeric"
          {...register("phoneNo", {
            required: "휴대폰 번호를 입력해주세요.",
            pattern: {
              value: /^\d{10,11}$/,
              message: "'-' 없이 10~11자리 숫자로 입력해주세요.",
            },
          })}
          error={errors.phoneNo?.message}
        />
        <Select label="통신사" {...register("telecom", { required: true })} error={errors.telecom?.message}>
          <SelectOption value="1">SKT (SKT 알뜰폰)</SelectOption>
          <SelectOption value="2">KT (KT 알뜰폰)</SelectOption>
          <SelectOption value="3">LG U+ (LG U+ 알뜰폰)</SelectOption>
        </Select>
        <Select
          label="조회 시작 년도"
          {...register("startDate", { required: "조회 시작 년도를 선택해주세요." })}
          error={errors.startDate?.message}
        >
          {yearOptions.map((year) => (
            <SelectOption key={year} value={year}>
              {year}
            </SelectOption>
          ))}
        </Select>
        <Select
          label="조회 종료 년도"
          {...register("endDate", {
            required: "조회 종료 년도를 선택해주세요.",
            validate: (endYear) => {
              if (!startYear) return true;
              return (
                Number.parseInt(endYear) >= Number.parseInt(startYear) ||
                "조회 종료 년도는 조회 시작 년도보다 같거나 이후여야 합니다."
              );
            },
          })}
          error={errors.endDate?.message}
        >
          {yearOptions.map((year) => (
            <SelectOption key={year} value={year}>
              {year}
            </SelectOption>
          ))}
        </Select>
        <Select
          label="간편 인증"
          {...register("loginTypeLevel", { required: true })}
          error={errors.loginTypeLevel?.message}
        >
          <SelectOption value="1">카카오톡</SelectOption>
          <SelectOption value="2">페이코</SelectOption>
          <SelectOption value="3">삼성패스</SelectOption>
          <SelectOption value="4">국민은행(국민인증서)</SelectOption>
          <SelectOption value="5">통신사(PASS)</SelectOption>
          <SelectOption value="6">네이버</SelectOption>
          <SelectOption value="7">신한은행(신한인증서)</SelectOption>
          <SelectOption value="8">토스</SelectOption>
          <SelectOption value="9">뱅크샐러드</SelectOption>
          <SelectOption value="10">하나은행(하나인증서)</SelectOption>
          <SelectOption value="11">NH모바일인증서</SelectOption>
        </Select>
        <Button type="submit" variant="primary" loading={isMFAPending} disabled={!isDirty}>
          건강검진 조회
        </Button>
        {mfaResponse?.status === "success" && (
          <>
            <p>간편 인증을 마치고, 인증 완료 버튼을 눌러주세요.</p>
            <Button variant="primary" loading={isMedicalCheckupPending} onClick={handleMFACompleteClick}>
              인증 완료
            </Button>
          </>
        )}
      </form>
      <hr />
      <h2>
        <code>건강검진결과</code>:
      </h2>
      {medicalCheckupResponse?.status === "success" && (
        <pre>
          <code>{JSON.stringify(medicalCheckupResponse.data)}</code>
        </pre>
      )}
    </div>
  );
}

export default App;
