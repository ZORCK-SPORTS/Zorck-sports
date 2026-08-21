import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const publicDirectory = resolve(fileURLToPath(new URL("../public/", import.meta.url)));
const port = Number(process.env.PORT || 4173);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function safeFilePath(pathname) {
  const decoded = decodeURIComponent(pathname.split("?")[0]);
  const relativePath = normalize(decoded === "/" ? "index.html" : decoded.replace(/^\/+/, ""));
  const absolutePath = resolve(join(publicDirectory, relativePath));
  return absolutePath === publicDirectory || absolutePath.startsWith(`${publicDirectory}${sep}`)
    ? absolutePath
    : null;
}

const server = createServer(async (request, response) => {
  try {
    const filePath = safeFilePath(request.url || "/");
    if (!filePath) {
      response.writeHead(400).end("Requisição inválida");
      return;
    }

    const file = await stat(filePath);
    if (!file.isFile()) throw new Error("Arquivo não encontrado");

    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Não encontrado");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Zorck Sport disponível em http://127.0.0.1:${port}`);
});
