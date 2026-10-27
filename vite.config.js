// A static build for GitHub Pages (project site). Two plain pages: the demo and its local admin view.
export default {
  base: "./",
  build: { outDir: "dist", emptyOutDir: true, rollupOptions: { input: { main: "index.html", admin: "admin.html" } } },
};
