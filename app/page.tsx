import type { Metadata } from "next";
import { CatalogExplorer } from "./catalog-explorer";

/* eslint-disable @next/next/no-img-element -- featured images are remote catalog thumbnails. */

const WHATSAPP = "https://wa.me/5511997073939";
const INSTAGRAM = "https://www.instagram.com/zorcksport/";

export const metadata: Metadata = {
  title: "Zorck Sport | Uniformes personalizados",
  description:
    "Escolha entre centenas de modelos e personalize uniformes para times, turmas, empresas, pesca, agro e eventos com a Zorck Sport.",
};

function whatsapp(message: string) {
  return `${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-lockup${compact ? " brand-lockup-compact" : ""}`}>
      <span className="brand-emblem" aria-hidden="true"><span>C</span></span>
      <span className="brand-name"><strong>ZORCK</strong><span>SPORT</span></span>
    </span>
  );
}

export default function Home() {
  const generalMessage = whatsapp(
    "Olá! Acessei o site da Zorck Sport e quero saber mais sobre os uniformes personalizados.",
  );

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <div className="announcement-bar">
        <p><span aria-hidden="true">✦</span> ATENDIMENTO E PEDIDOS PELO WHATSAPP</p>
        <a href={generalMessage} target="_blank" rel="noopener noreferrer">11 99707-3939 <span aria-hidden="true">↗</span></a>
      </div>

      <header className="site-header" id="inicio">
        <a className="header-brand" href="#inicio" aria-label="Zorck Sport — início"><Brand compact /></a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#catalogo">Catálogo</a>
          <a href="#solucoes">Soluções</a>
          <a href="#como-pedir">Como pedir</a>
          <a href="#diferenciais">Por que a Zorck</a>
        </nav>

        <div className="header-actions">
          <a className="instagram-link" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
            <span className="instagram-glyph" aria-hidden="true" /><span>@zorcksport</span>
          </a>
          <a className="header-whatsapp" href={generalMessage} target="_blank" rel="noopener noreferrer">Orçamento <span aria-hidden="true">↗</span></a>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Abrir menu"><span /><span /></summary>
          <nav aria-label="Navegação móvel">
            <a href="#catalogo">Catálogo</a>
            <a href="#solucoes">Soluções</a>
            <a href="#como-pedir">Como pedir</a>
            <a href={generalMessage} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
          </nav>
        </details>
      </header>

      <main id="conteudo">
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow"><span /> UNIFORMES QUE REPRESENTAM</p>
            <h1>VISTA A<br /><em>SUA IDENTIDADE.</em></h1>
            <p className="hero-lead">Modelos marcantes para times, turmas, empresas e eventos. Escolha uma referência e transforme em um uniforme com a cara do seu grupo.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#catalogo">Explorar catálogo <span aria-hidden="true">↘</span></a>
              <a className="button button-ghost" href={generalMessage} target="_blank" rel="noopener noreferrer"><span className="wa-mini" aria-hidden="true">WA</span> Chamar no WhatsApp</a>
            </div>
            <div className="hero-proof" aria-label="Diferenciais da Zorck Sport">
              <div><strong>694</strong><span>modelos para inspirar</span></div>
              <div><strong>100%</strong><span>personalizável</span></div>
              <div><strong>Direto</strong><span>com nosso atendimento</span></div>
            </div>
          </div>

          <div className="hero-showcase" aria-label="Destaques do catálogo">
            <div className="showcase-orbit" aria-hidden="true"><Brand /></div>
            <article className="showcase-card showcase-main">
              <img src="https://www.janeteartes.com/imagens/thumbs/camisa-interclasse-modelo-881-tigre-57778.webp" alt="Modelo de uniforme interclasse com tema tigre" />
              <div><span>INTERCLASSE</span><strong>Modelo 881 · Tigre</strong></div>
            </article>
            <article className="showcase-card showcase-small showcase-top">
              <img src="https://www.janeteartes.com/imagens/thumbs/camisa-terceirao-arara-azul-voando-59324.webp" alt="Modelo de uniforme de terceirão com arara azul" />
              <span>TERCEIRÃO</span>
            </article>
            <article className="showcase-card showcase-small showcase-bottom">
              <img src="https://www.janeteartes.com/imagens/thumbs/camisa-interclasse-camiseta-pesca-001-88154.webp" alt="Modelo de camisa para pesca esportiva" />
              <span>PESCA</span>
            </article>
            <div className="customize-note"><b aria-hidden="true">+</b><p>Personalize cores,<br />nomes, números e logos.</p></div>
          </div>
        </section>

        <div className="ticker" aria-label="Categorias atendidas">
          <div>
            <span>INTERCLASSE</span><b>✦</b><span>TERCEIRÃO</span><b>✦</b><span>TIMES</span><b>✦</b><span>EMPRESAS</span><b>✦</b><span>EVENTOS</span><b>✦</b><span>PESCA & AGRO</span><b>✦</b>
            <span aria-hidden="true">INTERCLASSE</span><b aria-hidden="true">✦</b><span aria-hidden="true">TERCEIRÃO</span><b aria-hidden="true">✦</b><span aria-hidden="true">TIMES</span><b aria-hidden="true">✦</b><span aria-hidden="true">EMPRESAS</span><b aria-hidden="true">✦</b><span aria-hidden="true">EVENTOS</span><b aria-hidden="true">✦</b><span aria-hidden="true">PESCA & AGRO</span><b aria-hidden="true">✦</b>
          </div>
        </div>

        <section className="solutions section" id="solucoes">
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-dark"><span /> FEITO PARA O SEU GRUPO</p>
              <h2>UMA CAMISA.<br /><em>MUITAS HISTÓRIAS.</em></h2>
            </div>
            <p>Do campeonato da escola ao uniforme da empresa, cada projeto nasce para traduzir a identidade de quem vai vestir.</p>
          </div>

          <div className="solution-grid">
            <a className="solution-card solution-large" href="#catalogo"><span className="solution-number">01</span><span className="solution-symbol" aria-hidden="true">⚡</span><div><p>ESCOLARES</p><h3>Interclasse,<br />terceirão e formandos</h3></div><span className="round-arrow" aria-hidden="true">↗</span></a>
            <a className="solution-card" href="#catalogo"><span className="solution-number">02</span><span className="solution-symbol" aria-hidden="true">◎</span><div><p>ESPORTIVOS</p><h3>Times e equipes</h3></div><span className="round-arrow" aria-hidden="true">↗</span></a>
            <a className="solution-card solution-gold" href="#catalogo"><span className="solution-number">03</span><span className="solution-symbol" aria-hidden="true">✦</span><div><p>PROFISSIONAIS</p><h3>Empresas e negócios</h3></div><span className="round-arrow" aria-hidden="true">↗</span></a>
            <a className="solution-card solution-silver" href="#catalogo"><span className="solution-number">04</span><span className="solution-symbol" aria-hidden="true">≈</span><div><p>OUTDOOR</p><h3>Pesca, agro e aventura</h3></div><span className="round-arrow" aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="catalog-section" id="catalogo">
          <div className="catalog-intro section">
            <div><p className="eyebrow"><span /> CATÁLOGO ZORCK SPORT</p><h2>ESCOLHA O MODELO.<br /><em>A GENTE FAZ ACONTECER.</em></h2></div>
            <div className="catalog-stat"><strong>694</strong><span>referências prontas<br />para inspirar</span></div>
          </div>
          <div className="catalog-inner section"><CatalogExplorer /></div>
        </section>

        <section className="process" id="como-pedir">
          <div className="process-copy">
            <p className="eyebrow"><span /> DO MODELO AO PEDIDO</p>
            <h2>ESCOLHER FICOU<br /><em>BEM MAIS SIMPLES.</em></h2>
            <p>Sem carrinho e sem preço engessado. Cada projeto recebe um atendimento de acordo com o que você precisa.</p>
            <aside className="custom-note"><span aria-hidden="true">i</span><div><strong>Modelo exclusivo?</strong><p>Também criamos uma arte do zero. Se houver custo adicional, você fica sabendo antes do início do trabalho.</p></div></aside>
            <a className="button button-light" href={generalMessage} target="_blank" rel="noopener noreferrer">Começar meu pedido <span aria-hidden="true">↗</span></a>
          </div>
          <ol className="process-list">
            <li><span>01</span><div><h3>Encontre sua referência</h3><p>Use a busca e os filtros para navegar por centenas de modelos.</p></div></li>
            <li><span>02</span><div><h3>Selecione seus favoritos</h3><p>Marque um ou vários modelos e envie a lista pronta pelo WhatsApp.</p></div></li>
            <li><span>03</span><div><h3>Personalize do seu jeito</h3><p>Adapte cores, nomes, números e logos para criar a identidade do grupo.</p></div></li>
          </ol>
        </section>

        <section className="quality section" id="diferenciais">
          <div className="quality-art" aria-hidden="true"><span className="quality-c">C</span><span className="quality-ring ring-one" /><span className="quality-ring ring-two" /><p>ZORCK<br />SPORT</p></div>
          <div className="quality-copy">
            <p className="eyebrow eyebrow-dark"><span /> SUA IDEIA, COM IDENTIDADE</p>
            <h2>NÃO É SÓ UNIFORME.<br /><em>É PERTENCIMENTO.</em></h2>
            <p>Uma peça bem pensada faz o grupo se reconhecer. Por isso, o atendimento acontece de pessoa para pessoa — do primeiro modelo aos detalhes finais.</p>
            <ul><li><span>01</span> Catálogo amplo e fácil de pesquisar</li><li><span>02</span> Personalização orientada pelo seu projeto</li><li><span>03</span> Atendimento direto pelo WhatsApp</li></ul>
          </div>
        </section>

        <section className="final-cta">
          <div><p className="eyebrow"><span /> PRONTO PARA COMEÇAR?</p><h2>SEU PRÓXIMO UNIFORME<br /><em>COMEÇA AQUI.</em></h2></div>
          <div className="final-action"><p>Transforme sua referência em um projeto com a cara do seu grupo.</p><div><a className="button button-gold" href={generalMessage} target="_blank" rel="noopener noreferrer"><span className="wa-mini" aria-hidden="true">WA</span> WhatsApp</a><a className="button button-ghost" href={INSTAGRAM} target="_blank" rel="noopener noreferrer"><span className="instagram-glyph" aria-hidden="true" /> Instagram</a></div></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand"><Brand /><p>Uniformes que vestem identidade.</p></div>
          <div className="footer-nav"><p>NAVEGUE</p><a href="#inicio">Início</a><a href="#catalogo">Catálogo</a><a href="#como-pedir">Como pedir</a></div>
          <div className="footer-contact"><p>ATENDIMENTO</p><a href={generalMessage} target="_blank" rel="noopener noreferrer">11 99707-3939 <span>↗</span></a><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">@zorcksport <span>↗</span></a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Zorck Sport</span><span>Modelos de referência: catálogo Janete Artes.</span></div>
      </footer>

      <nav className="floating-contact" aria-label="Canais de contato">
        <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Zorck Sport"><span className="instagram-glyph" aria-hidden="true" /><span>Instagram</span></a>
        <a href={generalMessage} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da Zorck Sport"><span className="wa-mini" aria-hidden="true">WA</span><span>WhatsApp</span></a>
      </nav>
    </>
  );
}
