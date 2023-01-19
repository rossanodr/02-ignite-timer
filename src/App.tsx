import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { CyclesContextProvider } from "./contexts/CyclesContexts";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { defaultTheme } from "./styles/themes/default";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
