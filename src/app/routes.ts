import { createBrowserRouter } from "react-router";
import { lazy, Suspense, createElement, useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { ContactPage } from "./components/ContactPage";
import { projectsIndexLoader, projectRouteLoaders } from "./projectRouteLoaders";

/* ── Lazy-loaded project pages ── */
const ProjectsPage = lazy(projectsIndexLoader);
const ProjectMya = lazy(projectRouteLoaders["/projects/mya"]);
const ProjectRoma = lazy(projectRouteLoaders["/projects/roma"]);
const ProjectMakerWeek = lazy(projectRouteLoaders["/projects/maker-week"]);
const ProjectMzw = lazy(projectRouteLoaders["/projects/mzw"]);
const ProjectKh = lazy(projectRouteLoaders["/projects/kittyhub"]);
const ProjectSnatsh = lazy(projectRouteLoaders["/projects/snatsh"]);
const ProjectArte = lazy(projectRouteLoaders["/projects/arte"]);
const ProjectDc = lazy(projectRouteLoaders["/projects/digital-campus"]);
const ProjectNrtv = lazy(projectRouteLoaders["/projects/narratiiv"]);
const ProjectSncf = lazy(projectRouteLoaders["/projects/sncf-connect"]);
const ProjectHaiti = lazy(projectRouteLoaders["/projects/haiti"]);
const ProjectRadioLibre = lazy(projectRouteLoaders["/projects/radio-libre"]);
const ProjectParsemains = lazy(projectRouteLoaders["/projects/parsemains"]);

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
      { path: "projects/parsemains", Component: withSuspense(ProjectParsemains) },
      { path: "*", Component: NotFound },
    ],
  },
  { path: "/contact", Component: ContactPage },
]);
