import { createBrowserRouter, type RouteObject } from "react-router";
import { lazy, Suspense, createElement, useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";

/* ── Lazy-loaded project pages ── */
const ProjectMya = lazy(() =>
  import("./components/ProjectMya").then((m) => ({ default: m.ProjectMya }))
);
const ProjectRoma = lazy(() =>
  import("./components/ProjectRoma").then((m) => ({ default: m.ProjectRoma }))
);
const ProjectMakerWeek = lazy(() =>
  import("./components/ProjectMakerWeek").then((m) => ({
    default: m.ProjectMakerWeek,
  }))
);
const ProjectMzw = lazy(() =>
  import("./components/ProjectMzw").then((m) => ({ default: m.ProjectMzw }))
);
const ProjectKh = lazy(() =>
  import("./components/ProjectKh").then((m) => ({ default: m.ProjectKh }))
);
const ProjectSnatsh = lazy(() =>
  import("./components/ProjectSnatsh").then((m) => ({
    default: m.ProjectSnatsh,
  }))
);
const ProjectArte = lazy(() =>
  import("./components/ProjectArte").then((m) => ({
    default: m.ProjectArte,
  }))
);
const ProjectDc = lazy(() =>
  import("./components/ProjectDc").then((m) => ({
    default: m.ProjectDc,
  }))
);
const ProjectNrtv = lazy(() =>
  import("./components/ProjectNrtv").then((m) => ({ default: m.ProjectNrtv }))
);
const ProjectSncf = lazy(() =>
  import("./components/ProjectSncf").then((m) => ({ default: m.ProjectSncf }))
);
const ProjectHaiti = lazy(() =>
  import("./components/ProjectHaiti").then((m) => ({ default: m.ProjectHaiti }))
);
const ProjectRadioLibre = lazy(() =>
  import("./components/ProjectRadioLibre").then((m) => ({ default: m.ProjectRadioLibre }))
);
const ProjectsPage = lazy(() =>
  import("./components/ProjectsPage").then((m) => ({
    default: m.ProjectsPage,
  }))
);

function DelayedRouteFallback() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(true), 180);
    return () => window.clearTimeout(timer);
  }, []);

  if (!show) return null;

  return createElement("div", {
    className: "flex items-center justify-center min-h-[60vh]",
    children: createElement("div", {
      className: "w-6 h-6 rounded-full border-2 border-current border-t-transparent animate-spin opacity-30",
    }),
  });
}

/* Suspense wrapper for lazy components */
function withSuspense(Component: React.LazyExoticComponent<React.ComponentType>) {
  return function SuspenseWrapper() {
    return createElement(
      Suspense,
      {
        fallback: createElement(DelayedRouteFallback),
      },
      createElement(Component)
    );
  };
}

/* ── 404 page ── */
function NotFound() {
  return createElement(
    "div",
    {
      className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6",
    },
    createElement(
      "h1",
      {
        style: {
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(3rem, 10vw, 6rem)",
          fontWeight: 700,
          lineHeight: 1,
          opacity: 0.15,
        },
      },
      "404"
    ),
    createElement(
      "p",
      {
        style: {
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.9rem",
          opacity: 0.4,
        },
      },
      "Page introuvable"
    ),
    createElement(
      "a",
      {
        href: "/",
        className: "mt-4 px-5 py-2 rounded-full transition-all duration-300",
        style: {
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.8rem",
          border: "1px solid rgba(128,128,128,0.2)",
          opacity: 0.5,
        },
      },
      "← Retour"
    )
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "projects", Component: withSuspense(ProjectsPage) },
      { path: "projects/mya", Component: withSuspense(ProjectMya) },
      { path: "projects/roma", Component: withSuspense(ProjectRoma) },
      { path: "projects/maker-week", Component: withSuspense(ProjectMakerWeek) },
      { path: "projects/mzw", Component: withSuspense(ProjectMzw) },
      { path: "projects/kittyhub", Component: withSuspense(ProjectKh) },
      { path: "projects/snatsh", Component: withSuspense(ProjectSnatsh) },
      { path: "projects/arte", Component: withSuspense(ProjectArte) },
      { path: "projects/digital-campus", Component: withSuspense(ProjectDc) },
      { path: "projects/narratiiv", Component: withSuspense(ProjectNrtv) },
      { path: "projects/sncf-connect", Component: withSuspense(ProjectSncf) },
      { path: "projects/haiti", Component: withSuspense(ProjectHaiti) },
      { path: "projects/radio-libre", Component: withSuspense(ProjectRadioLibre) },
      { path: "*", Component: NotFound },
    ],
  },
]);
