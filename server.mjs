// Zero-dependency static server for the demos.
//   npm install && npm start   →  http://localhost:8124
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const PORT = process.env.PORT ?? 8124;
const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json", ".vtt": "text/vtt",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".map": "application/json",
};

createServer(async (req, res) => {
  try {
    const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\])+/, "");
    const file = path === "" ? "index.html" : path;
    const body = await readFile(join(process.cwd(), file));
    res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
  }
}).listen(PORT, () => console.log(`OGPlayer web demos → http://localhost:${PORT}`));
