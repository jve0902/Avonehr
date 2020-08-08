import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import AppRouter from "./routes/AppRoutes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
