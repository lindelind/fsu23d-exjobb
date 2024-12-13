import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: isProduction
          ? "https://fsu23d-exjobb.onrender.com" // production
          : "http://localhost:3000", //dev
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
