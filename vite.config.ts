import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    // 将组件打包出来
    /* lib: {
      entry: "src/VirtualList.tsx",
      name: "VirtualList",
      formats: ["umd", "es"],
      fileName: "VirtualList",
    },
    outDir: "dist/lib" */
    // 打包出 web component
    lib: {
      entry: "./web-component.js",
      name: "VirtualList",
      formats: ["umd"],
      fileName: "virtual-list",
    },
    outDir: "dist/web"
  },
});
