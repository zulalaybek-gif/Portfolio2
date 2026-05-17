import { RouterProvider } from "react-router";
import { router } from "./routes";
import { I18nProvider } from "./components/i18n";
import { ThemeProvider } from "./components/theme";

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <RouterProvider router={router} />
      </I18nProvider>
    </ThemeProvider>
  );
}
