import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "../src/App.tsx";

const routes = ["/", "/signup"];
const distDir = path.resolve("dist");
const template = readFileSync(path.join(distDir, "index.html"), "utf8");

for (const route of routes) {
  const markup = renderToString(
    <StaticRouter location={route}>
      <App />
    </StaticRouter>,
  );
  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${markup}</div>`,
  );
  const outFile =
    route === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, route, "index.html");
  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`Prerendered ${route} -> ${path.relative(process.cwd(), outFile)}`);
}
