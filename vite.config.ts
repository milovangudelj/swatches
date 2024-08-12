import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "~/components": path.resolve(__dirname, "./components"),
      "~/styles": path.resolve(__dirname, "./styles"),
      "~/lib": path.resolve(__dirname, "./lib"),
    },
  },
  plugins: [react()],
});
