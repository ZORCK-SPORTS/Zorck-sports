import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDirectory = join(root, "public");
const distDirectory = join(root, "dist");
const clientDirectory = join(distDirectory, "client");
const serverDirectory = join(distDirectory, "server");
const metadataDirectory = join(distDirectory, ".openai");

if (dirname(distDirectory) !== root || !distDirectory.endsWith("dist")) {
  throw new Error("Diretório de saída inválido.");
}

await rm(distDirectory, { recursive: true, force: true });
await mkdir(clientDirectory, { recursive: true });
await mkdir(serverDirectory, { recursive: true });
await mkdir(metadataDirectory, { recursive: true });

await cp(publicDirectory, clientDirectory, { recursive: true });
await cp(join(root, ".openai", "hosting.json"), join(metadataDirectory, "hosting.json"));

const worker = `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || request.method !== "GET") return response;

    const fallbackUrl = new URL("/index.html", request.url);
    return env.ASSETS.fetch(new Request(fallbackUrl, request));
  },
};
`;

await writeFile(join(serverDirectory, "index.js"), worker, "utf8");

console.log("Site estático gerado em dist/client.");
