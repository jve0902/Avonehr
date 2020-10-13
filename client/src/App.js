import React from "react";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import AppRouter from "./routes/AppRoutes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AppRouter />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
