import type { ComponentType } from "react";

type RouteModule = { default: ComponentType };
type RouteLoader = () => Promise<RouteModule>;

export const projectsIndexLoader: RouteLoader = () =>
  import("./components/ProjectsPage").then((m) => ({ default: m.ProjectsPage }));

export const projectRouteLoaders = {
  "/projects/mya": () => import("./components/ProjectMya").then((m) => ({ default: m.ProjectMya })),
  "/projects/roma": () => import("./components/ProjectRoma").then((m) => ({ default: m.ProjectRoma })),
  "/projects/maker-week": () => import("./components/ProjectMakerWeek").then((m) => ({ default: m.ProjectMakerWeek })),
  "/projects/mzw": () => import("./components/ProjectMzw").then((m) => ({ default: m.ProjectMzw })),
  "/projects/kittyhub": () => import("./components/ProjectKh").then((m) => ({ default: m.ProjectKh })),
  "/projects/snatsh": () => import("./components/ProjectSnatsh").then((m) => ({ default: m.ProjectSnatsh })),
  "/projects/arte": () => import("./components/ProjectArte").then((m) => ({ default: m.ProjectArte })),
  "/projects/digital-campus": () => import("./components/ProjectDc").then((m) => ({ default: m.ProjectDc })),
  "/projects/narratiiv": () => import("./components/ProjectNrtv").then((m) => ({ default: m.ProjectNrtv })),
  "/projects/sncf-connect": () => import("./components/ProjectSncf").then((m) => ({ default: m.ProjectSncf })),
  "/projects/haiti": () => import("./components/ProjectHaiti").then((m) => ({ default: m.ProjectHaiti })),
  "/projects/radio-libre": () => import("./components/ProjectRadioLibre").then((m) => ({ default: m.ProjectRadioLibre })),
} satisfies Record<string, RouteLoader>;

export function preloadProjectRoute(path: string) {
  if (path === "/projects") {
    void projectsIndexLoader();
    return;
  }

  const loader = projectRouteLoaders[path as keyof typeof projectRouteLoaders];
  if (loader) void loader();
}
