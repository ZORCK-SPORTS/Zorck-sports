import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const pagesRoot = new URL("../dist/client/", import.meta.url);
const basePath = "/Zorck-sports";

test("exports a complete GitHub Pages document under the repository base path", async () => {
  const html = await readFile(new URL("index.html", pagesRoot), "utf8");

  assert.match(html, /<html lang="pt-BR">/i);
  assert.match(html, /Zorck Sport \| Uniformes personalizados/i);
  assert.match(html, /href="https:\/\/zorck-sports\.github\.io\/Zorck-sports\/_next\/static\/css\//);
  assert.match(html, /src="https:\/\/zorck-sports\.github\.io\/Zorck-sports\/_next\/static\/chunks\//);
  assert.match(html, /src="\/Zorck-sports\/zorck-logo\.png"/);
  assert.match(html, /src="\/Zorck-sports\/hero-shirts\/interclasse\.png"/);
  assert.match(html, /https:\/\/zorck-sports\.github\.io\/Zorck-sports\/og\.png/);
  assert.doesNotMatch(html, /(?:src|href)="\/(?!Zorck-sports\/)/);
});

test("ships every local asset and a base-path-aware catalog request", async () => {
  await Promise.all([
    access(new URL(".nojekyll", pagesRoot)),
    access(new URL("catalog-data.js", pagesRoot)),
    access(new URL("zorck-logo.png", pagesRoot)),
    access(new URL("favicon-zorck.svg", pagesRoot)),
    access(new URL("og.png", pagesRoot)),
    access(new URL("hero-shirts/interclasse.png", pagesRoot)),
    access(new URL("hero-shirts/formandos.png", pagesRoot)),
    access(new URL("hero-shirts/terceirao.png", pagesRoot)),
    access(new URL("hero-shirts/pesca.png", pagesRoot)),
  ]);

  const chunksDirectory = new URL("_next/static/chunks/", pagesRoot);
  const chunks = await readdir(chunksDirectory);
  const sources = await Promise.all(
    chunks
      .filter((name) => name.endsWith(".js"))
      .map((name) => readFile(new URL(name, chunksDirectory), "utf8")),
  );
  const catalogChunk = sources.find((source) => source.includes("catalog-data.js"));

  assert.ok(catalogChunk, "catalog client chunk should be present");
  assert.ok(catalogChunk.includes(basePath), "catalog chunk should include the repository base path");
  assert.doesNotMatch(catalogChunk, /fetch\(["'`]\/catalog-data\.js/);
});
