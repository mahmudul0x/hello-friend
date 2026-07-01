// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const netlifyBuild = process.env.NETLIFY_BUILD === "1";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Netlify has no Cloudflare Workers runtime. Prerender a single client-only
    // shell and let TanStack Router take over in the browser (classic SPA);
    // netlify.toml rewrites every path to that shell.
    ...(netlifyBuild && {
      spa: { enabled: true },
    }),
  },
  // Netlify has no Cloudflare Workers runtime, so skip nitro's Workers build
  // for this target — TanStack Start's own client/server environments plus
  // `spa` prerender above are enough to produce a static dist/ folder.
  ...(netlifyBuild && { nitro: false }),
});
