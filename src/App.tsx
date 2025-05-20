import { useEffect } from "react";
import { cn } from "./utils/cn";
import { requestMedicalCheckupAuth } from "./apis/requestMedicalCheckupAuth";
import { getMedicalCheckup } from "./apis/getMedicalCheckup";

function App() {
  // TODO: API Mocking 확인 후 제거
  useEffect(() => {
    (async () => {
      try {
        const response = await requestMedicalCheckupAuth({});
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
    })();
  }, []);

  return <h1 className={cn("text-3xl font-bold underline")}>Hello world!</h1>;
}

export default App;
