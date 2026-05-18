const fs = require("node:fs");
const path = require("node:path");

const distDir = path.resolve(__dirname, "../dist");
const siteUrl = "https://www.zulal-aybek.com";

const routeMeta = [
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

function withRouteMeta(html, route) {
  const url = `${siteUrl}${route.path === "/" ? "/" : route.path}`;
  return html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${escapeHtml(url)}" />`
    )
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${escapeHtml(url)}" />`
    );
}

const indexHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

for (const route of routeMeta) {
  const filePath =
    route.path === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, route.path, "index.html");

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, withRouteMeta(indexHtml, route));
}

const notFoundHtml = `<!doctype html>
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

fs.writeFileSync(path.join(distDir, "404.html"), notFoundHtml);
