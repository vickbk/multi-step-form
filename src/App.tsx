import "bootstrap-icons/font/bootstrap-icons.css";
import { ContextProvider } from "./features/layout/components/context-provider";
import { MultiStepForm } from "./features/layout/components/multi-step-form";
import "./shared/styles/global.css";
import "./shared/styles/scss/global.scss";

function App() {
  return (
    <ContextProvider>
      <MultiStepForm />
    </ContextProvider>
  );
}

export default App;
