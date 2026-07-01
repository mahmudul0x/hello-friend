// Turns TanStack Start's SPA prerender output (dist/client/_shell.html +
// dist/client/assets) into a plain static site Netlify can serve directly
// from dist/. Run after `vite build` with NETLIFY_BUILD=1 set (see the
// "build:netlify" npm script).
import { cpSync, renameSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const distDir = join(root, "dist");
const clientDir = join(distDir, "client");
const serverDir = join(distDir, "server");
const shellPath = join(clientDir, "_shell.html");
const indexPath = join(clientDir, "index.html");

if (!existsSync(shellPath)) {
  throw new Error(`Expected prerendered shell at ${shellPath} — SPA prerender may have failed.`);
}
renameSync(shellPath, indexPath);
rmSync(serverDir, { recursive: true, force: true });

// netlify.toml publishes "dist", so move dist/client/* up to dist/.
cpSync(clientDir, distDir, { recursive: true });
rmSync(clientDir, { recursive: true, force: true });

console.log("Netlify static build ready in dist/");
