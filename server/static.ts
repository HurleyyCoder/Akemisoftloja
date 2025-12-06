import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Possible locations for the built client:
  //  - projectRoot/dist/public  (set by vite build)
  //  - server/public           (legacy)
  const candidatePaths = [
    path.resolve(__dirname, "..", "dist", "public"),
    path.resolve(__dirname, "public"),
  ];

  const distPath = candidatePaths.find((p) => fs.existsSync(p));

  if (!distPath) {
    throw new Error(
      `Could not find the build directory. Tried: ${candidatePaths.join(", ")}. Run the client build first (e.g. 'npm run build').`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
