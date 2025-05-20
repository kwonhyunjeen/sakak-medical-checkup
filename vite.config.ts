import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    checker({
      overlay: {
        initialIsOpen: false,
      },
      typescript: {
        tsconfigPath: "./tsconfig.app.json",
      },
    }),
    react(),
  ],
  server: {
    proxy: {
      "/candiy-api": {
        target: "https://api.candiy.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/candiy-api/, ""),
      },
    },
  },
});
