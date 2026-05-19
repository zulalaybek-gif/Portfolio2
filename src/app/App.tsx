import { RouterProvider } from "react-router";
import { router } from "./routes";
import { I18nProvider } from "./components/i18n";
import { ThemeProvider } from "./components/theme";
import { PerformanceGuards } from "./components/PerformanceGuards";
import { ScrollProgressIndicator } from "./components/ScrollProgressIndicator";
import { BackToTopButton } from "./components/BackToTopButton";

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <PerformanceGuards />
        <ScrollProgressIndicator />
        <BackToTopButton />
        <RouterProvider router={router} />
      </I18nProvider>
    </ThemeProvider>
  );
}
