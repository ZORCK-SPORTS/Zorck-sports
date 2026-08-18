import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html", host: "localhost" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished Zorck Sport homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="pt-BR">/i);
  assert.match(html, /Zorck Sport \| Uniformes personalizados/i);
  assert.match(html, /Não vista/i);
  assert.match(html, /Explorar 694 modelos/i);
  assert.match(html, /11 99707-3939/);
  assert.match(html, /@zorcksport/);
  assert.match(html, /\/zorck-logo\.png/);
  assert.match(html, /\/hero-shirts\/interclasse\.png/);
  assert.match(html, /\/hero-shirts\/formandos\.png/);
  assert.match(html, /\/hero-shirts\/terceirao\.png/);
  assert.match(html, /\/hero-shirts\/pesca\.png/);
  assert.match(html, /Encontre a sua direção/i);
  assert.match(html, /WhatsApp/i);
  assert.match(html, /Site desenvolvido por/i);
  assert.match(html, /Quimera Tech/i);
  assert.match(html, /gbrielh\.github\.io\/Quimera-tech/i);
  assert.doesNotMatch(html, /Escolha\. Combine|Identidade em movimento/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("ships the catalog and social card without starter assets", async () => {
  const [page, layout, packageJson, catalog] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../public/catalog-data.js", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<CatalogExplorer/);
  assert.match(page, /<WhatsAppIcon/);
  assert.match(layout, /\/og\.png/);
  assert.match(catalog, /window\.BRANDS_CATALOG/);
  assert.doesNotMatch(page, /button-gold|wa-mini|announcement-bar|ticker/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/zorck-logo.png", import.meta.url));
  await access(new URL("../public/hero-shirts/interclasse.png", import.meta.url));
  await access(new URL("../public/hero-shirts/formandos.png", import.meta.url));
  await access(new URL("../public/hero-shirts/terceirao.png", import.meta.url));
  await access(new URL("../public/hero-shirts/pesca.png", import.meta.url));
  await access(new URL("../public/favicon-zorck.svg", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
