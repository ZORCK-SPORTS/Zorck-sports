(() => {
  "use strict";

  const MOTION = Object.freeze({
    duration: Object.freeze({ micro: 0.22, fast: 0.42, base: 0.68, slow: 0.9, curtain: 0.48 }),
    ease: Object.freeze({ enter: "power3.out", exit: "power3.in", expressive: "expo.out", snap: "back.out(1.35)" }),
    stagger: Object.freeze({ words: 0.055, text: 0.075, cards: 0.085 }),
    distance: Object.freeze({ text: 18, title: 72, section: 46 }),
  });

  window.ZORCK_MOTION = MOTION;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function markReady() {
    document.documentElement.classList.add("motion-system-ready");
  }

  function setupHeaderState() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function splitWords(element) {
    if (!element || element.dataset.motionSplit) return [];
    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach((node) => {
      const fragment = document.createDocumentFragment();
      node.nodeValue.split(/(\s+)/).forEach((part) => {
        if (!part.trim()) {
          fragment.append(part);
          return;
        }
        const clip = document.createElement("span");
        const word = document.createElement("span");
        clip.className = "motion-word-clip";
        word.className = "motion-word";
        word.textContent = part;
        clip.append(word);
        fragment.append(clip);
      });
      node.replaceWith(fragment);
    });
    element.dataset.motionSplit = "true";
    return [...element.querySelectorAll(".motion-word")];
  }

  function setupHeroIntro() {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const words = splitWords(hero.querySelector("h1"));
    const timeline = gsap.timeline({ defaults: { ease: MOTION.ease.expressive } });
    timeline
      .from(words, { yPercent: 125, rotate: 2.5, skewY: 5, duration: MOTION.duration.slow, stagger: MOTION.stagger.words }, 0.08)
      .from(".hero .eyebrow", { x: -30, opacity: 0, duration: MOTION.duration.base }, 0.18)
      .from(".hero-lead", { y: MOTION.distance.text, opacity: 0, filter: "blur(6px)", duration: MOTION.duration.base }, 0.34)
      .from(".hero-actions > *", { y: 18, opacity: 0, stagger: 0.1, duration: MOTION.duration.base }, 0.45)
      .from(".hero-proof > div", { y: 20, opacity: 0, stagger: 0.09, duration: MOTION.duration.base }, 0.54)
      .from(".hero-stage", { clipPath: "inset(0 0 0 100%)", duration: 1.05 }, 0)
      .from(".hero-product img", { scale: 1.1, y: 35, opacity: 0, duration: 1.1 }, 0.22)
      .from(".lookbook-card", { x: 45, opacity: 0, rotate: 3, stagger: 0.12, duration: MOTION.duration.slow }, 0.48)
      .from(".hero-picker", { y: 35, opacity: 0, duration: MOTION.duration.base }, 0.64);
  }

  function titleReveal(element) {
    const words = splitWords(element);
    if (!words.length) return;
    gsap.from(words, {
      yPercent: 120,
      skewY: 6,
      rotate: 1.5,
      duration: MOTION.duration.slow,
      stagger: MOTION.stagger.words,
      ease: MOTION.ease.expressive,
      scrollTrigger: { trigger: element, start: "top 84%", once: true },
    });
  }

  function setupSectionReveals() {
    document.querySelectorAll(".section-heading h2, .custom-intro h2, .process-banner h2").forEach(titleReveal);

    document.querySelectorAll(".section-heading > p, .brand-policy-catalog, .catalog-tools, .custom-intro > p, .process-banner .section-kicker").forEach((element) => {
      gsap.from(element, {
        y: MOTION.distance.text,
        opacity: 0,
        filter: "blur(5px)",
        duration: MOTION.duration.base,
        ease: MOTION.ease.enter,
        scrollTrigger: { trigger: element, start: "top 88%", once: true },
      });
    });

    document.querySelectorAll(".custom-list").forEach((list) => {
      gsap.from(list.children, {
        x: 35,
        opacity: 0,
        stagger: MOTION.stagger.text,
        duration: MOTION.duration.base,
        ease: MOTION.ease.enter,
        scrollTrigger: { trigger: list, start: "top 82%", once: true },
      });
    });

    document.querySelectorAll(".custom-section, .process-banner").forEach((section) => {
      gsap.fromTo(section, { "--section-wipe": "0%" }, {
        "--section-wipe": "100%",
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "top 42%", scrub: 0.7 },
      });
    });

    gsap.from(".site-footer", {
      clipPath: "inset(16% 0 0 0)",
      y: 35,
      duration: MOTION.duration.slow,
      ease: MOTION.ease.enter,
      scrollTrigger: { trigger: ".site-footer", start: "top 94%", once: true },
    });
  }

  function setupParallax() {
    gsap.to(".hero-product", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 },
    });
    gsap.to(".hero-lookbook", {
      yPercent: -10,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.1 },
    });
    gsap.to(".stage-word", {
      xPercent: 8,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 },
    });
    gsap.to(".motion-rail span", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: 0.4 },
    });
  }

  function animateCards(cards) {
    const fresh = [...cards].filter((card) => !card.dataset.motionCard);
    if (!fresh.length) return;
    fresh.forEach((card) => {
      card.dataset.motionCard = "true";
      setupCardTilt(card);
    });
    gsap.set(fresh, { y: 42, scale: 0.965, opacity: 0, clipPath: "inset(8% 0 0 0 round 2px)", transformPerspective: 900, transformOrigin: "center center" });
    ScrollTrigger.batch(fresh, {
      start: "top 92%",
      once: true,
      onEnter(batch) {
        gsap.to(batch, { y: 0, scale: 1, opacity: 1, clipPath: "inset(0% 0 0 0 round 2px)", duration: MOTION.duration.base, stagger: MOTION.stagger.cards, ease: MOTION.ease.enter, clearProps: "clipPath" });
      },
    });
  }

  function setupCardTilt(card) {
    if (!finePointer) return;
    const media = card.querySelector(".product-media img");
    const xTo = gsap.quickTo(card, "rotationY", { duration: 0.35, ease: "power2.out" });
    const yTo = gsap.quickTo(card, "rotationX", { duration: 0.35, ease: "power2.out" });
    const raiseTo = gsap.quickTo(card, "y", { duration: 0.35, ease: "power2.out" });
    const scaleTo = gsap.quickTo(card, "scale", { duration: 0.35, ease: "power2.out" });
    const imageX = media ? gsap.quickTo(media, "x", { duration: 0.45, ease: "power2.out" }) : null;
    const imageY = media ? gsap.quickTo(media, "y", { duration: 0.45, ease: "power2.out" }) : null;

    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const px = (event.clientX - bounds.left) / bounds.width - 0.5;
      const py = (event.clientY - bounds.top) / bounds.height - 0.5;
      xTo(px * 3.2);
      yTo(py * -3.2);
      imageX?.(px * 7);
      imageY?.(py * 7);
      card.style.setProperty("--glow-x", `${(px + 0.5) * 100}%`);
      card.style.setProperty("--glow-y", `${(py + 0.5) * 100}%`);
    });
    card.addEventListener("pointerenter", () => {
      raiseTo(-7);
      scaleTo(1.006);
    });
    card.addEventListener("pointerleave", () => {
      xTo(0);
      yTo(0);
      raiseTo(0);
      scaleTo(1);
      imageX?.(0);
      imageY?.(0);
    });
  }

  function setupDynamicCatalog() {
    const grid = document.querySelector("#product-grid");
    if (!grid) return;
    animateCards(grid.querySelectorAll(".product-card"));
    new MutationObserver(() => {
      animateCards(grid.querySelectorAll(".product-card"));
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }).observe(grid, { childList: true });
  }

  function setupCategoryMotion() {
    const filters = document.querySelector("#category-filters");
    if (!filters) return;
    gsap.from(filters.children, {
      x: 38,
      opacity: 0,
      stagger: 0.065,
      duration: MOTION.duration.base,
      ease: MOTION.ease.enter,
      scrollTrigger: { trigger: filters, start: "top 88%", once: true },
    });
  }

  function setupDialogMotion() {
    const dialog = document.querySelector("#product-dialog");
    if (!dialog) return;
    new MutationObserver(() => {
      if (!dialog.open) return;
      gsap.fromTo(dialog, { opacity: 0, scale: 0.96, clipPath: "inset(10% 6% 10% 6% round 24px)" }, { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 0px)", duration: MOTION.duration.base, ease: MOTION.ease.expressive });
      gsap.from(".dialog-media img", { scale: 1.08, duration: MOTION.duration.slow, ease: MOTION.ease.enter });
      gsap.from(".dialog-copy > *", { y: 18, opacity: 0, stagger: 0.055, duration: MOTION.duration.fast, ease: MOTION.ease.enter });
    }).observe(dialog, { attributes: true, attributeFilter: ["open"] });
  }

  function setupPageTransitions() {
    const curtain = document.querySelector(".page-transition");
    if (!curtain) return;
    document.querySelectorAll("a[href]").forEach((link) => {
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash || link.target === "_blank") return;
      link.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        gsap.timeline({ onComplete: () => { window.location.href = url.href; } })
          .set(curtain, { pointerEvents: "auto" })
          .to(curtain, { clipPath: "inset(0 0 0 0)", duration: MOTION.duration.curtain, ease: MOTION.ease.enter })
          .to(".page-transition span", { scaleX: 1, duration: MOTION.duration.fast, ease: MOTION.ease.expressive }, 0.08);
      });
    });
  }

  function setupAnchorNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        history.pushState(null, "", link.getAttribute("href"));
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        gsap.timeline()
          .to(".motion-rail", { width: 4, duration: MOTION.duration.micro, ease: MOTION.ease.snap })
          .to(".motion-rail", { width: 1, duration: MOTION.duration.fast, ease: MOTION.ease.enter });
      });
    });
  }

  function init() {
    setupHeaderState();
    if (!gsap || !ScrollTrigger || reduced) {
      document.documentElement.classList.add("motion-reduced");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    markReady();
    gsap.defaults({ ease: MOTION.ease.enter, duration: MOTION.duration.base });
    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

    const context = gsap.context(() => {
      setupHeroIntro();
      setupSectionReveals();
      setupParallax();
      setupDynamicCatalog();
      setupCategoryMotion();
      setupDialogMotion();
      setupPageTransitions();
      setupAnchorNavigation();
    });

    window.addEventListener("pagehide", () => context.revert(), { once: true });
    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  }

  init();
})();
