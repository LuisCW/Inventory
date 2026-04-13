import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          mui: ["@mui/material", "@mui/system", "@emotion/react", "@emotion/styled"],
          charts: ["recharts", "dayjs", "decimal.js"],
          forms: ["react-hook-form", "sweetalert2"],
        },
      },
    },
  },
  server: {
    port: 5173,
  },
});
