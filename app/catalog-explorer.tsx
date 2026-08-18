"use client";

/* eslint-disable @next/next/no-img-element -- Janete Artes supplies dynamic remote thumbnails at runtime. */

import { useEffect, useMemo, useState } from "react";
import { withBasePath } from "./site-paths";
import { WhatsAppIcon } from "./social-icons";

type CatalogItem = {
  name: string;
  code?: string;
  image: string;
  categories?: string[];
};

const categoryOptions = [
  { value: "", label: "Todos" },
  { value: "Interclasse", label: "Interclasse" },
  { value: "Terceirao", label: "Terceirão" },
  { value: "Nono Ano", label: "Nono ano" },
  { value: "Time Amador", label: "Times" },
  { value: "Pesca", label: "Pesca" },
  { value: "Agro", label: "Agro" },
  { value: "Abada", label: "Abadás" },
  { value: "Formandos", label: "Formandos" },
  { value: "Professor", label: "Professor" },
  { value: "Profissao", label: "Profissões" },
  { value: "Religiao", label: "Religiosos" },
];

const categoryLabels: Record<string, string> = Object.fromEntries(
  categoryOptions.map(({ value, label }) => [value, label]),
);

const PAGE_SIZE = 16;
const WHATSAPP_NUMBER = "5511997073939";

function normalize(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function displayName(value = "") {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/^(?:(?:Arte|Vetor|Estampa)\s+)+/i, "")
    .replace(/^para\s+(?:de\s+)?(?=camisa|camiseta)/i, "")
    .replace(/^modelo\s+(?=camisa|camiseta)/i, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function itemKey(item: CatalogItem) {
  return `${item.code ?? ""}::${item.name}`;
}

function itemCategory(item: CatalogItem) {
  const category = item.categories?.find(Boolean) ?? "";
  return categoryLabels[category] || category || "Novidade";
}

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function ProductCard({
  item,
  selected,
  onSelect,
  onOpen,
}: {
  item: CatalogItem;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}) {
  const title = displayName(item.name);
  const message = `Olá! Vi o modelo ${title}${item.code ? ` (#${item.code})` : ""} no catálogo da Zorck Sport e quero saber mais sobre a personalização.`;

  return (
    <article className={`product-card${selected ? " is-selected" : ""}`}>
      <button
        className="product-media"
        type="button"
        onClick={onOpen}
        aria-label={`Ver detalhes de ${title}`}
      >
        <img
          src={item.image}
          alt={title}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.classList.add("image-error");
            event.currentTarget.alt = `Imagem indisponível — ${title}`;
          }}
        />
        <span className="product-category">{itemCategory(item)}</span>
        <span className="product-zoom" aria-hidden="true">+</span>
      </button>

      <button
        className="select-model"
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        aria-label={`${selected ? "Remover" : "Selecionar"} ${title}`}
      >
        <span aria-hidden="true">{selected ? "✓" : "+"}</span>
      </button>

      <div className="product-content">
        <p>{item.code ? `MODELO #${item.code}` : "MODELO PERSONALIZÁVEL"}</p>
        <h3>{title}</h3>
        <a
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Quero o modelo ${title} pelo WhatsApp — abre em nova guia`}
        >
          <WhatsAppIcon className="whatsapp-icon" />
          <span>Quero este modelo</span>
        </a>
      </div>
    </article>
  );
}

export function CatalogExplorer() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<CatalogItem | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(withBasePath("/catalog-data.js"))
      .then((response) => {
        if (!response.ok) throw new Error("Catálogo indisponível");
        return response.text();
      })
      .then((source) => {
        const start = source.indexOf("[");
        const end = source.lastIndexOf("]");
        if (start < 0 || end < start) throw new Error("Catálogo inválido");
        const parsed = JSON.parse(source.slice(start, end + 1)) as CatalogItem[];
        if (cancelled) return;
        setItems(parsed.filter((item) => item.name && item.image));
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!activeItem) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeItem]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalize(query);
    const normalizedCategory = normalize(category);

    return items.filter((item) => {
      const categories = item.categories ?? [];
      const searchable = normalize(
        `${item.name} ${categories.join(" ")} ${item.code ?? ""}`,
      );
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesCategory =
        !normalizedCategory ||
        categories.some((value) => normalize(value) === normalizedCategory) ||
        normalize(item.name).includes(normalizedCategory);
      return matchesQuery && matchesCategory;
    });
  }, [items, query, category]);

  const visibleItems = filteredItems.slice(0, visible);
  const selectedItems = items.filter((item) => selected.has(itemKey(item)));

  function chooseCategory(value: string) {
    setCategory(value);
    setVisible(PAGE_SIZE);
  }

  function changeQuery(value: string) {
    setQuery(value);
    setVisible(PAGE_SIZE);
  }

  function toggleSelection(item: CatalogItem) {
    const key = itemKey(item);
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const selectionMessage = selectedItems.length
    ? `Olá! Separei estes modelos no catálogo da Zorck Sport:\n\n${selectedItems
        .map(
          (item, index) =>
            `${index + 1}. ${displayName(item.name)}${item.code ? ` (#${item.code})` : ""}`,
        )
        .join("\n")}\n\nQuero conversar sobre personalização e valores.`
    : "Olá! Acessei o catálogo da Zorck Sport e quero saber mais.";

  return (
    <div className="catalog-explorer">
      <div className="catalog-layout">
        <aside className="catalog-toolbar" aria-label="Filtros do catálogo">
          <label className="catalog-search">
            <span>ENCONTRE SEU MODELO</span>
            <span className="search-field">
              <span className="search-symbol" aria-hidden="true">⌕</span>
              <input
                type="search"
                value={query}
                onChange={(event) => changeQuery(event.target.value)}
                placeholder="Tema, animal ou modalidade"
                autoComplete="off"
              />
              {query ? (
                <button type="button" onClick={() => changeQuery("")}>
                  Limpar
                </button>
              ) : null}
            </span>
          </label>

          <div className="category-wrap">
            <p>NAVEGUE POR CATEGORIA</p>
            <div className="category-tabs" role="group" aria-label="Categorias do catálogo">
              {categoryOptions.map((option) => (
                <button
                  key={option.value || "all"}
                  type="button"
                  className={category === option.value ? "active" : ""}
                  onClick={() => chooseCategory(option.value)}
                  aria-pressed={category === option.value}
                >
                  <span>{option.label}</span>
                  <span aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="catalog-results">
          <div className="results-head">
            <div>
              <p>MODELOS ENCONTRADOS</p>
              <strong>
                {status === "loading"
                  ? "Carregando catálogo..."
                  : status === "error"
                    ? "Não foi possível carregar agora"
                    : `${filteredItems.length} ${filteredItems.length === 1 ? "modelo disponível" : "modelos disponíveis"}`}
              </strong>
            </div>
            <p>Marque os favoritos <span aria-hidden="true">+</span></p>
          </div>

          {status === "loading" ? (
            <div className="catalog-loading" role="status" aria-label="Carregando modelos">
              {Array.from({ length: 8 }, (_, index) => (
                <div key={index} className="loading-card" />
              ))}
            </div>
          ) : null}

          {status === "error" ? (
            <div className="catalog-empty">
              <span aria-hidden="true">!</span>
              <h3>O catálogo está se atualizando.</h3>
              <p>Você ainda pode falar com a gente e pedir um modelo exclusivo.</p>
              <a
                href={whatsappUrl("Olá! Quero conhecer os modelos disponíveis da Zorck Sport.")}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-light"
              >
                <WhatsAppIcon className="whatsapp-icon" />
                Pedir modelos no WhatsApp
              </a>
            </div>
          ) : null}

          {status === "ready" && filteredItems.length === 0 ? (
            <div className="catalog-empty">
              <span aria-hidden="true">?</span>
              <h3>Nenhum modelo encontrado.</h3>
              <p>Tente outro termo ou peça uma criação exclusiva para o seu projeto.</p>
              <button type="button" className="button button-light" onClick={() => changeQuery("")}>
                Limpar busca
              </button>
            </div>
          ) : null}

          {status === "ready" && visibleItems.length ? (
            <div className="product-grid" aria-live="polite">
              {visibleItems.map((item) => (
                <ProductCard
                  key={itemKey(item)}
                  item={item}
                  selected={selected.has(itemKey(item))}
                  onSelect={() => toggleSelection(item)}
                  onOpen={() => setActiveItem(item)}
                />
              ))}
            </div>
          ) : null}

          {status === "ready" && visible < filteredItems.length ? (
            <div className="load-more-wrap">
              <button
                className="button button-outline"
                type="button"
                onClick={() => setVisible((current) => current + PAGE_SIZE)}
              >
                Carregar mais modelos <span aria-hidden="true">↓</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {selectedItems.length ? (
        <div className="selection-bar" aria-live="polite">
          <div>
            <span className="selection-check" aria-hidden="true">✓</span>
            <p>
              <strong>{selectedItems.length} {selectedItems.length === 1 ? "modelo selecionado" : "modelos selecionados"}</strong>
              <button type="button" onClick={() => setSelected(new Set())}>Limpar seleção</button>
            </p>
          </div>
          <a href={whatsappUrl(selectionMessage)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="whatsapp-icon" />
            Enviar seleção no WhatsApp
          </a>
        </div>
      ) : null}

      {activeItem ? (
        <div
          className="dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveItem(null);
          }}
        >
          <section
            className="product-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-dialog-title"
          >
            <button
              className="dialog-close"
              type="button"
              onClick={() => setActiveItem(null)}
              aria-label="Fechar detalhes"
            >
              ×
            </button>
            <div className="dialog-media">
              <img src={activeItem.image} alt={displayName(activeItem.name)} />
            </div>
            <div className="dialog-content">
              <p>{itemCategory(activeItem).toLocaleUpperCase("pt-BR")}</p>
              <h3 id="product-dialog-title">{displayName(activeItem.name)}</h3>
              <span>{activeItem.code ? `Modelo #${activeItem.code}` : "Modelo personalizável"}</span>
              <p>Gostou? Envie este modelo e conte como quer personalizar cores, nomes, números e logos.</p>
              <a
                className="button button-dark"
                href={whatsappUrl(
                  `Olá! Quero saber mais sobre o modelo ${displayName(activeItem.name)}${activeItem.code ? ` (#${activeItem.code})` : ""} da Zorck Sport.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="whatsapp-icon" />
                Quero este modelo
              </a>
              <button
                className="dialog-select"
                type="button"
                onClick={() => toggleSelection(activeItem)}
              >
                {selected.has(itemKey(activeItem)) ? "Remover da seleção" : "Adicionar à seleção"}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
