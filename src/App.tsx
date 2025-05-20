import { useEffect } from "react";
import { cn } from "./utils/cn";

function App() {
  // TODO: API Mocking 확인 후 제거
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/candiy-api/v1/nhis/checkup", {
          method: "POST",
          headers: { "x-api-key": import.meta.env.VITE_CANDIY_API_KEY },
          body: JSON.stringify({ isContinue: "0" }),
        });
        const json = await response.json();
        console.log("requestMedicalCheckupAuth:", json);
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await fetch("/candiy-api/v1/nhis/checkup", {
          method: "POST",
          headers: { "x-api-key": import.meta.env.VITE_CANDIY_API_KEY },
          body: JSON.stringify({ isContinue: "1" }),
        });
        const json = await response.json();
        console.log("getMedicalCheckup:", json);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return <h1 className={cn("text-3xl font-bold underline")}>Hello world!</h1>;
}

export default App;
