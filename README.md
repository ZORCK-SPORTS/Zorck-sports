# Zorck Sport

Site institucional e catálogo da Zorck Sport feito com HTML, CSS e JavaScript puros. Não há framework ou biblioteca de interface; GSAP e ScrollTrigger são versionados localmente para o sistema de movimento.

## Estrutura

- `public/index.html`: conteúdo e estrutura da página.
- `public/styles.css`: identidade visual e responsividade.
- `public/app.js`: catálogo, filtros, seleção e interações.
- `public/motion-system.js`: sistema central de movimento, timelines GSAP, ScrollTrigger e presets reutilizáveis.
- `public/catalog-data.js`: dados dos 586 modelos ativos.

Para visualizar localmente, basta servir ou abrir `public/index.html`.

## Catálogo

O arquivo `public/catalog-data.js` contém o snapshot das referências públicas exibidas no site.

## Motion Design System

O objeto global `window.ZORCK_MOTION` centraliza durações, easings, staggers e distâncias. O sistema usa GSAP e ScrollTrigger para reveals editoriais, parallax, cards dinâmicos, modal e navegação; microinterações permanecem no CSS. Quando GSAP não estiver disponível ou `prefers-reduced-motion` estiver ativo, o conteúdo continua visível e funcional sem animações elaboradas.

## Contato

- WhatsApp: `11 99707-3939`
- Instagram: `@zorcksport`
