import "bootstrap-icons/font/bootstrap-icons.css";
import { ContextProvider } from "./app/components/context-provider";
import { MultiStepForm } from "./app/components/multi-step-form";
import {
  Heading,
  Main,
} from "./shared/heading-manager/components/heading-managers";
import "./shared/styles/global.css";
import "./shared/styles/scss/global.scss";

function App() {
  return (
    <ContextProvider>
      <Main pageHasH1={false}>
        <Heading className="sr-only">Multi Step Form</Heading>
        <MultiStepForm />
      </Main>
    </ContextProvider>
  );
}

export default App;
