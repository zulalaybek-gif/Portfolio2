const fs = require("node:fs");
const path = require("node:path");

const distDir = path.resolve(__dirname, "../dist");
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
