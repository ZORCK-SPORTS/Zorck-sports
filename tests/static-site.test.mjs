import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const client = new URL("../dist/client/", import.meta.url);

test("entrega uma página estática completa em português", async () => {
  const html = await readFile(new URL("index.html", client), "utf8");

  assert.match(html, /<html lang="pt-BR">/i);
  assert.match(html, /Zorck Sport \| Uniformes personalizados/i);
  assert.match(html, /Vista o que[\s\S]*une vocês/i);
  assert.match(html, /Comece por uma[\s\S]*ideia que combina/i);
  assert.match(html, /11 99707-3939/);
  assert.match(html, /@zorcksport/);
  assert.match(html, /\.\/styles\.css/);
  assert.match(html, /\.\/catalog-data\.js/);
  assert.match(html, /\.\/app\.js/);
  assert.doesNotMatch(html, /_next|react|vinext|codex-preview/i);
});

test("mantém os ativos locais, o catálogo e a saída do Sites", async () => {
  await Promise.all([
    access(new URL(".nojekyll", client)),
    access(new URL("app.js", client)),
    access(new URL("styles.css", client)),
    access(new URL("catalog-data.js", client)),
    access(new URL("favicon-zorck.svg", client)),
    access(new URL("og.png", client)),
    access(new URL("hero-shirts/interclasse.png", client)),
    access(new URL("hero-shirts/formandos.png", client)),
    access(new URL("hero-shirts/terceirao.png", client)),
    access(new URL("hero-shirts/pesca.png", client)),
    access(new URL("../dist/server/index.js", import.meta.url)),
    access(new URL("../dist/.openai/hosting.json", import.meta.url)),
  ]);

  const source = await readFile(new URL("public/catalog-data.js", root), "utf8");
  const context = { window: {} };
  vm.runInNewContext(source, context);
  assert.equal(context.window.BRANDS_CATALOG.length, 694);
  assert.ok(context.window.BRANDS_CATALOG.every((item) => item.name && item.image));
});

test("usa somente HTML, CSS e JavaScript no site entregue", async () => {
  const packageJson = JSON.parse(await readFile(new URL("package.json", root), "utf8"));
  const app = await readFile(new URL("public/app.js", root), "utf8");

  assert.equal(packageJson.dependencies, undefined);
  assert.equal(packageJson.devDependencies, undefined);
  assert.doesNotMatch(app, /from\s+["']react|useState|useEffect|jsx|tsx/i);
  assert.match(app, /window\.BRANDS_CATALOG/);
});
