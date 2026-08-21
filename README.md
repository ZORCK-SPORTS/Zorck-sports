# Zorck Sport

Site institucional e catálogo da Zorck Sport feito com HTML, CSS e JavaScript puros. Não há framework, biblioteca de interface ou dependência de produção.

## Estrutura

- `public/index.html`: conteúdo e estrutura da página.
- `public/styles.css`: identidade visual e responsividade.
- `public/app.js`: catálogo, filtros, seleção e interações.

Para visualizar localmente, execute `npm run dev`. Para gerar a versão publicável em `dist`, execute `npm run build`.

## Catálogo

O arquivo `public/catalog-data.js` contém o snapshot das referências públicas da Janete Artes exibidas no site. Para sincronizá-lo novamente no Windows, execute:

```powershell
& '.\tools\sync-catalog.ps1'
```

O script mantém apenas peças de vestuário, remove materiais digitais auxiliares, reúne categorias e preserva o último catálogo até uma nova sincronização bem-sucedida.

## Contato

- WhatsApp: `11 99707-3939`
- Instagram: `@zorcksport`
