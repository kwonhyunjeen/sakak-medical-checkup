import { useEffect } from "react";
import { requestMedicalCheckupAuth } from "./apis/requestMedicalCheckupAuth";
import { getMedicalCheckup } from "./apis/getMedicalCheckup";
import { TextField } from "./components/ui/TextField";
import { Select, SelectOption } from "./components/ui/Select";
import { Button } from "./components/ui/Button";

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

  return (
    <>
      <TextField label="Label" placeholder="Input text" description="Description" error="Error message" />
      <Select label="Label" description="Description" error="Error message">
        <SelectOption disabled selected>
          Select item
        </SelectOption>
        <SelectOption value="1">Option 1</SelectOption>
        <SelectOption value="2">Option 2</SelectOption>
        <SelectOption value="3">Option 3</SelectOption>
      </Select>
      <Button variant="default">Button</Button>
      <Button variant="primary">Button</Button>
      <Button variant="error">Button</Button>
    </>
  );
}

export default App;
