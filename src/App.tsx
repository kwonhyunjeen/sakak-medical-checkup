import { requestMultiFactorAuth } from "./apis/requestMultiFactorAuth";
import { getMedicalCheckup } from "./apis/getMedicalCheckup";
import { TextField } from "./components/ui/TextField";
import { Select, SelectOption } from "./components/ui/Select";
import { Button } from "./components/ui/Button";
import { startTransition, useActionState, useState } from "react";
import type { APIErrorResponse } from "./schemas/api";
import type { LoginTypeLevel, Telecom } from "./schemas/auth";

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

function App() {
  const [loginTypeLevel, setLoginTypeLevel] = useState<LoginTypeLevel>("1");
  const [legalName, setLegalName] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [telecom, setTelecom] = useState<Telecom>("1");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [mfaResponse, dispatchMFA, isMFAPending] = useActionState(async () => {
    try {
      return await requestMultiFactorAuth({
        id: MFA_SESSION_ID,
        loginTypeLevel,
        legalName,
        birthdate,
        phoneNo,
        telecom,
        startDate,
        endDate,
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
        id: MFA_SESSION_ID,
        loginTypeLevel,
        legalName,
        birthdate,
        phoneNo,
        telecom,
        startDate,
        endDate,
        multiFactorInfo: mfaResponse.data,
      });
    } catch (error) {
      return error as APIErrorResponse;
    }
  }, undefined);

  const handleMFAFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
    <>
      <form onSubmit={handleMFAFormSubmit}>
        <TextField
          label="이름"
          placeholder="홍길동"
          value={legalName}
          onChange={(event) => setLegalName(event.target.value)}
        />
        <TextField
          label="생년월일"
          placeholder="YYYYMMDD"
          value={birthdate}
          onChange={(event) => setBirthdate(event.target.value)}
        />
        <TextField
          label="휴대폰 번호"
          placeholder="'-' 없이 번호만 입력"
          value={phoneNo}
          onChange={(event) => setPhoneNo(event.target.value)}
        />
        <Select label="통신사" value={telecom} onChange={(event) => setTelecom(event.target.value as Telecom)}>
          <SelectOption value="1">SKT (SKT 알뜰폰)</SelectOption>
          <SelectOption value="2">KT (KT 알뜰폰)</SelectOption>
          <SelectOption value="3">LG U+ (LG U+ 알뜰폰)</SelectOption>
        </Select>
        <TextField
          label="조회 시작 년도"
          placeholder="YYYY"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
        <TextField
          label="조회 종료 년도"
          placeholder="YYYY"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
        />
        <Select
          label="간편 인증"
          value={loginTypeLevel}
          onChange={(event) => setLoginTypeLevel(event.target.value as LoginTypeLevel)}
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
        <Button type="submit" variant="primary" disabled={isMFAPending}>
          건강검진 조회
        </Button>
        {mfaResponse?.status === "success" && (
          <>
            <p>간편 인증을 마치고, 인증 완료 버튼을 눌러주세요.</p>
            <Button variant="primary" disabled={isMedicalCheckupPending} onClick={handleMFACompleteClick}>
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
    </>
  );
}

export default App;
