import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import {
  ControlPage,
  PageAlert,
  PageDialogBox,
  PageLoading,
} from "./components";
import { USER_ROLE } from "./config";
import { NotFound } from "./pages";
import { RootState } from "./state/store";
import { getUser } from "./utils";

const theme = createTheme({
  palette: {
    primary: {
      main: `#749e47`,
    },
    secondary: {
      main: `#444`,
    },
  },
});

function App() {
  const user = getUser();

  const ROUTES_CONFIG = [
    {
      path: "/admin/control",
      element: <ControlPage />,
      allowed: [USER_ROLE.GUEST],
    },
    {
      path: "/admin/debug",
      element: <ControlPage />,
      allowed: [USER_ROLE.GUEST],
    },
  ];

  const routes = ROUTES_CONFIG.map((e, key) => {
    return e.allowed.includes(user.role) ? (
      <Route key={key} path={e.path} element={e.element} />
    ) : null;
  });

  const pageLoading = useSelector(
    (state: RootState) => state.pageLoading.toggle
  );

  const alertDetail = useSelector((state: RootState) => state.pageAlert.detail);

  const dialogDetail = useSelector(
    (state: RootState) => state.pageDialog.detail
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {routes}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <PageLoading pageLoading={pageLoading} />
      <PageAlert alertDetail={alertDetail} />
      <PageDialogBox dialogDetail={dialogDetail} />
    </ThemeProvider>
  );
}

export default App;
