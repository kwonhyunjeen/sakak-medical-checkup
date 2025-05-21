import { requestMedicalCheckupAuth } from "./apis/requestMedicalCheckupAuth";
import { getMedicalCheckup } from "./apis/getMedicalCheckup";
import { TextField } from "./components/ui/TextField";
import { Select, SelectOption } from "./components/ui/Select";
import { Button } from "./components/ui/Button";
import { useState } from "react";
import type { MultiFactorInfo } from "./schemas/auth";

function App() {
  const [multiFactorInfo, setMultiFactorInfo] = useState<MultiFactorInfo>();

  /** @todo 리팩토링 */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await requestMedicalCheckupAuth({});
      setMultiFactorInfo(response.data);
      console.log("requestMedicalCheckupAuth:", response);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await getMedicalCheckup({});
      console.log("getMedicalCheckup:", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <TextField label="이름" placeholder="홍길동" />
        <TextField label="생년월일" placeholder="YYYYMMDD" />
        <TextField label="휴대폰 번호" placeholder="'-' 없이 번호만 입력" />
        <Select label="통신사">
          <SelectOption value="1">SKT (SKT 알뜰폰)</SelectOption>
          <SelectOption value="2">KT (KT 알뜰폰)</SelectOption>
          <SelectOption value="3">LG U+ (LG U+ 알뜰폰)</SelectOption>
        </Select>
        <TextField label="조회 시작 년도" placeholder="YYYY" />
        <TextField label="조회 종료 년도" placeholder="YYYY" />
        <Select label="간편 인증">
          <SelectOption value="1">카카오톡</SelectOption>
          <SelectOption value="2">페이코</SelectOption>
          <SelectOption value="3">삼성패스</SelectOption>
          <SelectOption value="4">국민은행(국민인증서),</SelectOption>
          <SelectOption value="5">통신사(PASS)</SelectOption>
          <SelectOption value="6">네이버</SelectOption>
          <SelectOption value="7">신한은행(신한인증서)</SelectOption>
          <SelectOption value="8">스,</SelectOption>
          <SelectOption value="9">뱅크샐러드</SelectOption>
          <SelectOption value="10">하나은행(하나인증서)</SelectOption>
          <SelectOption value="11">NH모바일인증서</SelectOption>
        </Select>
        <Button type="submit" variant="primary">
          건강검진 조회
        </Button>
      </form>
      <hr />
      <h2>
        <code>multiFactorInfo</code>:
      </h2>
      {multiFactorInfo && (
        <pre>
          <code>{JSON.stringify(multiFactorInfo)}</code>
        </pre>
      )}
    </>
  );
}

export default App;
