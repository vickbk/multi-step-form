import "bootstrap-icons/font/bootstrap-icons.css";
import { ContextProvider } from "./shared/components/context-provider";
import { TestDrawer } from "./shared/heading-manager/components/test-drawer";
import "./shared/styles/global.css";
import "./shared/styles/scss/global.scss";

function App() {
  return (
    <ContextProvider>
      <TestDrawer />
    </ContextProvider>
  );
}

export default App;
