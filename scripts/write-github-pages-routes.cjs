const fs = require("node:fs");
const path = require("node:path");

const distDir = path.resolve(__dirname, "../dist");
const siteUrl = "https://www.zulal-aybek.com";

const routes = [
  { path: "/", title: "Zulal Aybek - Portfolio" },
  { path: "/projects", title: "Projets - Zulal Aybek" },
  { path: "/projects/mya", title: "Mya - Zulal Aybek" },
  { path: "/projects/roma", title: "Roma - Zulal Aybek" },
  { path: "/projects/maker-week", title: "Maker Week - Zulal Aybek" },
  { path: "/projects/mzw", title: "MZW - Zulal Aybek" },
  { path: "/projects/kittyhub", title: "KittyHub - Zulal Aybek" },
  { path: "/projects/snatsh", title: "SNATSH - Zulal Aybek" },
  { path: "/projects/arte", title: "Arte en Scene - Zulal Aybek" },
  { path: "/projects/digital-campus", title: "Digital Campus - Zulal Aybek" },
  { path: "/projects/narratiiv", title: "Narratiiv - Zulal Aybek" },
  { path: "/projects/sncf-connect", title: "SNCF Connect - Zulal Aybek" },
  { path: "/projects/haiti", title: "Haiti - Zulal Aybek" },
  { path: "/projects/radio-libre", title: "Radio Libre - Zulal Aybek" },
];

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getRouteUrl(routePath) {
  return `${siteUrl}${routePath === "/" ? "/" : routePath}`;
}

function getRouteFilePath(routePath) {
  if (routePath === "/") return path.join(distDir, "index.html");
  return path.join(distDir, routePath, "index.html");
}

function withRouteMeta(html, route) {
  const title = escapeHtml(route.title);
  const url = escapeHtml(getRouteUrl(route.path));

  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
}

function writeRoutePages() {
  const indexHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

  for (const route of routes) {
    const filePath = getRouteFilePath(route.path);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, withRouteMeta(indexHtml, route));
  }
}

function writeNotFoundPage() {
  const html = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>Redirection - Zulal Aybek</title>
    <script src="/github-pages-404.js"></script>
  </head>
  <body></body>
</html>
`;

  fs.writeFileSync(path.join(distDir, "404.html"), html);
}

writeRoutePages();
writeNotFoundPage();
