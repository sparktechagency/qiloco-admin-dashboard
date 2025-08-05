// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "10.0.60.210",
//     port: "3003",
//   },
// });

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "145.223.75.211",
    // host: "10.10.7.33",
    port: 3003,
  },
  build: {
    sourcemap: false, // disables source maps for production
    minify: "esbuild", // faster minifier
  },
});
