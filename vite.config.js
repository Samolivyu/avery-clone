import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "components": path.resolve(__dirname, "./src/components"),
      "utils": path.resolve(__dirname, "./src/lib/utils"),
      "ui": path.resolve(__dirname, "./src/components/ui"),
      "lib": path.resolve(__dirname, "./src/lib"),
      "hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
});