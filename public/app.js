(() => {
  "use strict";

  const WHATSAPP_NUMBER = "5511997073939";
  const PAGE_SIZE = 16;

  const categoryOptions = [
    ["", "Todos"],
    ["Interclasse", "Interclasse"],
    ["Terceirao", "Terceirão"],
    ["Nono Ano", "Nono ano"],
    ["Time Amador", "Times"],
    ["Pesca", "Pesca"],
    ["Agro", "Agro"],
    ["Formandos", "Formandos"],
    ["Professor", "Professor"],
    ["Profissao", "Profissões"],
  ];

  const categoryLabels = Object.fromEntries(categoryOptions);
  const items = Array.isArray(window.BRANDS_CATALOG)
    ? window.BRANDS_CATALOG.filter((item) => item?.name && item?.image)
    : [];

  const state = {
    category: "",
    query: "",
    visible: PAGE_SIZE,
    selected: new Set(),
    activeItem: null,
    lastDialogTrigger: null,
  };

  function whatsappUrl(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

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

  function itemKey(item) {
    return `${item.code || ""}::${item.name}`;
  }

  function itemCategory(item) {
    const value = item.categories?.find(Boolean) || "";
    return categoryLabels[value] || value || "Novidade";
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function setupWhatsAppLinks() {
    document.querySelectorAll(".whatsapp-link").forEach((link) => {
      const message = link.dataset.message || "Olá! Quero conhecer a Zorck Sport.";
      link.href = whatsappUrl(message);
    });
  }

  function setupMenu() {
    const button = document.querySelector("#menu-toggle");
    const menu = document.querySelector("#main-nav");
    if (!button || !menu) return;

    function closeMenu() {
      document.body.classList.remove("menu-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Abrir menu");
    }

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      document.body.classList.toggle("menu-open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
      button.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    });

    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  function setupHeroPicker() {
    const image = document.querySelector("#hero-shirt");
    const label = document.querySelector("#hero-label");
    const index = document.querySelector("#hero-index");
    const buttons = [...document.querySelectorAll(".hero-picker button")];
    if (!image || !label || !index || !buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.classList.contains("active")) return;

        buttons.forEach((candidate) => {
          const active = candidate === button;
          candidate.classList.toggle("active", active);
          candidate.setAttribute("aria-pressed", String(active));
        });

        image.classList.add("is-changing");
        const nextImage = new Image();
        nextImage.src = button.dataset.image;
        nextImage.onload = () => {
          image.src = button.dataset.image;
          image.alt = button.dataset.alt;
          label.textContent = button.dataset.label;
          index.textContent = button.dataset.index;
          requestAnimationFrame(() => image.classList.remove("is-changing"));
        };
        nextImage.onerror = () => image.classList.remove("is-changing");
      });
    });
  }

  const grid = document.querySelector("#product-grid");
  const resultsCount = document.querySelector("#results-count");
  const emptyState = document.querySelector("#catalog-empty");
  const loadMoreButton = document.querySelector("#load-more");
  const searchInput = document.querySelector("#catalog-search");
  const clearSearchButton = document.querySelector("#clear-search");
  const filters = document.querySelector("#category-filters");
  const selectionBar = document.querySelector("#selection-bar");
  const selectionCount = document.querySelector("#selection-count");
  const sendSelection = document.querySelector("#send-selection");
  const dialog = document.querySelector("#product-dialog");
  const dialogImage = document.querySelector("#dialog-image");
  const dialogCategory = document.querySelector("#dialog-category");
  const dialogTitle = document.querySelector("#dialog-title");
  const dialogCode = document.querySelector("#dialog-code");
  const dialogWhatsApp = document.querySelector("#dialog-whatsapp");
  const dialogSelect = document.querySelector("#dialog-select");

  function filteredItems() {
    const query = normalize(state.query);
    const category = normalize(state.category);

    return items.filter((item) => {
      const categories = item.categories || [];
      const searchable = normalize(`${item.name} ${categories.join(" ")} ${item.code || ""}`);
      const matchesQuery = !query || searchable.includes(query);
      const matchesCategory =
        !category ||
        categories.some((value) => normalize(value) === category) ||
        normalize(item.name).includes(category);
      return matchesQuery && matchesCategory;
    });
  }

  function selectionMessage(selectedItems) {
    if (!selectedItems.length) return "Olá! Acessei o catálogo da Zorck Sport e quero saber mais.";

    const list = selectedItems
      .map((item, position) => `${position + 1}. ${displayName(item.name)}${item.code ? ` (#${item.code})` : ""}`)
      .join("\n");
    return `Olá! Separei estes modelos no catálogo da Zorck Sport:\n\n${list}\n\nQuero conversar sobre personalização e valores.`;
  }

  function updateSelectionBar() {
    const selectedItems = items.filter((item) => state.selected.has(itemKey(item)));
    const count = selectedItems.length;
    selectionBar.hidden = count === 0;
    selectionCount.textContent = `${count} ${count === 1 ? "modelo selecionado" : "modelos selecionados"}`;
    sendSelection.href = whatsappUrl(selectionMessage(selectedItems));

    if (state.activeItem) {
      dialogSelect.textContent = state.selected.has(itemKey(state.activeItem))
        ? "Remover da seleção"
        : "Adicionar à seleção";
    }
  }

  function toggleSelection(item, card, button) {
    const key = itemKey(item);
    const selected = state.selected.has(key);
    if (selected) state.selected.delete(key);
    else state.selected.add(key);

    const nextSelected = !selected;
    if (card) card.classList.toggle("is-selected", nextSelected);
    if (button) {
      button.setAttribute("aria-pressed", String(nextSelected));
      button.setAttribute("aria-label", `${nextSelected ? "Remover" : "Selecionar"} ${displayName(item.name)}`);
      button.textContent = nextSelected ? "✓" : "+";
    }
    updateSelectionBar();
  }

  function openDialog(item, trigger) {
    if (!dialog?.showModal) return;
    state.activeItem = item;
    state.lastDialogTrigger = trigger;
    const title = displayName(item.name);

    dialogImage.src = item.image;
    dialogImage.alt = title;
    dialogCategory.textContent = itemCategory(item);
    dialogTitle.textContent = title;
    dialogCode.textContent = item.code ? `Modelo #${item.code}` : "Modelo personalizável";
    dialogWhatsApp.href = whatsappUrl(
      `Olá! Quero saber mais sobre o modelo ${title}${item.code ? ` (#${item.code})` : ""} da Zorck Sport.`,
    );
    dialogSelect.textContent = state.selected.has(itemKey(item)) ? "Remover da seleção" : "Adicionar à seleção";
    document.body.classList.add("dialog-open");
    dialog.showModal();
    document.querySelector("#dialog-close").focus();
  }

  function createProductCard(item) {
    const title = displayName(item.name);
    const key = itemKey(item);
    const selected = state.selected.has(key);
    const card = createElement("article", `product-card${selected ? " is-selected" : ""}`);

    const media = createElement("button", "product-media");
    media.type = "button";
    media.setAttribute("aria-label", `Ver detalhes de ${title}`);
    media.addEventListener("click", () => openDialog(item, media));

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = title;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => {
      image.classList.add("image-error");
      image.alt = `Imagem indisponível — ${title}`;
    });
    media.append(image);
    media.append(createElement("span", "product-category", itemCategory(item)));
    const zoom = createElement("span", "product-zoom", "+");
    zoom.setAttribute("aria-hidden", "true");
    media.append(zoom);

    const selectButton = createElement("button", "select-model", selected ? "✓" : "+");
    selectButton.type = "button";
    selectButton.setAttribute("aria-pressed", String(selected));
    selectButton.setAttribute("aria-label", `${selected ? "Remover" : "Selecionar"} ${title}`);
    selectButton.addEventListener("click", () => toggleSelection(item, card, selectButton));

    const content = createElement("div", "product-content");
    content.append(createElement("p", "", item.code ? `Modelo #${item.code}` : "Modelo personalizável"));
    content.append(createElement("h3", "", title));

    const contact = createElement("a", "", "Quero este modelo");
    contact.target = "_blank";
    contact.rel = "noopener noreferrer";
    contact.href = whatsappUrl(
      `Olá! Vi o modelo ${title}${item.code ? ` (#${item.code})` : ""} no catálogo da Zorck Sport e quero saber mais sobre a personalização.`,
    );
    contact.setAttribute("aria-label", `Quero o modelo ${title} pelo WhatsApp — abre em nova guia`);
    const arrow = createElement("span", "", "↗");
    arrow.setAttribute("aria-hidden", "true");
    contact.append(arrow);
    content.append(contact);

    card.append(media, selectButton, content);
    return card;
  }

  function renderCatalog() {
    if (!grid) return;
    const matches = filteredItems();
    const visibleItems = matches.slice(0, state.visible);
    const fragment = document.createDocumentFragment();
    visibleItems.forEach((item) => fragment.append(createProductCard(item)));
    grid.replaceChildren(fragment);

    if (!items.length) {
      resultsCount.textContent = "O catálogo não pôde ser carregado agora.";
      emptyState.hidden = false;
      emptyState.querySelector("h3").textContent = "O catálogo está se atualizando.";
      emptyState.querySelector("p").textContent = "Você ainda pode chamar a gente e pedir um modelo exclusivo.";
      loadMoreButton.hidden = true;
      return;
    }

    resultsCount.textContent = `${matches.length} ${matches.length === 1 ? "modelo encontrado" : "modelos encontrados"}`;
    emptyState.hidden = matches.length !== 0;
    loadMoreButton.hidden = state.visible >= matches.length;
  }

  function setCategory(value) {
    state.category = value;
    state.visible = PAGE_SIZE;
    filters.querySelectorAll("button").forEach((button) => {
      const active = button.dataset.value === value;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderCatalog();
  }

  function renderFilters() {
    const fragment = document.createDocumentFragment();
    categoryOptions.forEach(([value, label]) => {
      const button = createElement("button", value === state.category ? "active" : "", label);
      button.type = "button";
      button.dataset.value = value;
      button.setAttribute("aria-pressed", String(value === state.category));
      button.addEventListener("click", () => setCategory(value));
      fragment.append(button);
    });
    filters.replaceChildren(fragment);
  }

  function setupCatalog() {
    document.querySelectorAll(".catalog-total").forEach((node) => {
      node.textContent = String(items.length);
    });
    renderFilters();
    renderCatalog();
    updateSelectionBar();

    searchInput.addEventListener("input", () => {
      state.query = searchInput.value;
      state.visible = PAGE_SIZE;
      clearSearchButton.hidden = !state.query;
      renderCatalog();
    });

    clearSearchButton.addEventListener("click", () => {
      searchInput.value = "";
      state.query = "";
      state.visible = PAGE_SIZE;
      clearSearchButton.hidden = true;
      searchInput.focus();
      renderCatalog();
    });

    document.querySelector("#reset-filters").addEventListener("click", () => {
      searchInput.value = "";
      state.query = "";
      clearSearchButton.hidden = true;
      setCategory("");
      searchInput.focus();
    });

    loadMoreButton.addEventListener("click", () => {
      state.visible += PAGE_SIZE;
      renderCatalog();
      const firstNewCard = grid.children[state.visible - PAGE_SIZE];
      firstNewCard?.querySelector(".product-media")?.focus({ preventScroll: true });
    });

    document.querySelector("#clear-selection").addEventListener("click", () => {
      state.selected.clear();
      renderCatalog();
      updateSelectionBar();
    });
  }

  function setupDialog() {
    if (!dialog) return;

    document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
    dialogSelect.addEventListener("click", () => {
      if (!state.activeItem) return;
      toggleSelection(state.activeItem);
      renderCatalog();
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("dialog-open");
      const trigger = state.lastDialogTrigger;
      state.activeItem = null;
      state.lastDialogTrigger = null;
      trigger?.focus({ preventScroll: true });
    });
  }

  setupWhatsAppLinks();
  setupMenu();
  setupHeroPicker();
  setupCatalog();
  setupDialog();
})();
