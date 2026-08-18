/* eslint-disable @next/next/no-img-element -- catalog references are supplied by Janete Artes. */

import { CatalogExplorer } from "./catalog-explorer";
import { WhatsAppIcon } from "./social-icons";

const WHATSAPP_NUMBER = "5511997073939";
const INSTAGRAM_URL = "https://www.instagram.com/zorcksport/";

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-lockup${compact ? " brand-lockup-compact" : ""}`}>
      <img src="/zorck-logo.png" alt="Zorck Sport" />
    </span>
  );
}

function InstagramGlyph() {
  return <span className="instagram-glyph" aria-hidden="true" />;
}

export default function Home() {
  const introductionMessage =
    "Olá! Conheci a Zorck Sport pelo site e quero conversar sobre um uniforme personalizado.";

  return (
    <>
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>

      <header className="site-header">
        <a className="header-brand" href="#inicio" aria-label="Zorck Sport — início">
          <Brand compact />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#catalogo">Catálogo</a>
          <a href="#sob-medida">Sob medida</a>
          <a href="#processo">Como pedir</a>
        </nav>

        <div className="header-actions">
          <a
            className="header-instagram"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @zorcksport — abre em nova guia"
          >
            <InstagramGlyph />
            <span>@zorcksport</span>
          </a>
          <a
            className="header-whatsapp"
            href={whatsappUrl(introductionMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar com a Zorck Sport pelo WhatsApp — abre em nova guia"
          >
            <WhatsAppIcon className="whatsapp-icon" />
            <span>Conversar</span>
          </a>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Abrir menu">
            <span />
            <span />
          </summary>
          <nav aria-label="Navegação móvel">
            <a href="#catalogo">Catálogo</a>
            <a href="#sob-medida">Sob medida</a>
            <a href="#processo">Como pedir</a>
            <a
              href={whatsappUrl(introductionMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="whatsapp-icon" />
              WhatsApp
            </a>
          </nav>
        </details>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="overline">UNIFORMES PERSONALIZADOS · SÃO PAULO</p>
            <h1>
              Não vista
              <span>o óbvio.</span>
            </h1>
            <p className="hero-lead">
              Seu time, sua turma, sua história. A Zorck transforma referências em
              uniformes feitos para serem reconhecidos.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#catalogo">
                Explorar 694 modelos
                <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button button-ghost"
                href={whatsappUrl(introductionMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="whatsapp-icon" />
                Falar sobre meu projeto
              </a>
            </div>
          </div>

          <figure className="hero-visual">
            <div className="hero-image-frame">
              <img
                src="https://www.janeteartes.com/imagens/thumbs/arte-camisa-de-interclasse-aguia-preto-e-dourado-64971.webp"
                alt="Referência de uniforme esportivo personalizado em preto"
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <span>REFERÊNCIA 12257</span>
              <span>INTERCLASSE / PERSONALIZÁVEL</span>
            </figcaption>
          </figure>
        </section>

        <section className="audience-index" aria-labelledby="audience-title">
          <p id="audience-title">Projetos para</p>
          <ul>
            <li><span>01</span>Times</li>
            <li><span>02</span>Turmas</li>
            <li><span>03</span>Empresas</li>
            <li><span>04</span>Eventos</li>
          </ul>
          <p>Uma referência é só o começo.</p>
        </section>

        <section className="catalog-section" id="catalogo" aria-labelledby="catalog-title">
          <div className="catalog-heading">
            <div>
              <p className="overline">ARQUIVO DE REFERÊNCIAS · 694 MODELOS</p>
              <h2 id="catalog-title">Encontre a sua direção.</h2>
            </div>
            <p>
              Filtre, abra os detalhes e marque seus favoritos. Depois, envie a seleção
              de uma vez pelo WhatsApp.
            </p>
          </div>
          <CatalogExplorer />
        </section>

        <section className="studio" id="sob-medida" aria-labelledby="studio-title">
          <div className="studio-image">
            <img
              src="https://www.janeteartes.com/imagens/thumbs/camisa-de-interclasse-cobra-serpente-azul-74501.webp"
              alt="Uniforme personalizado azul usado como referência criativa"
              loading="lazy"
            />
            <span aria-hidden="true">Z / 02</span>
          </div>
          <div className="studio-copy">
            <p className="overline overline-dark">ATELIÊ DE IDEIAS</p>
            <h2 id="studio-title">O catálogo inspira. Seu projeto decide.</h2>
            <p>
              Podemos adaptar uma referência ou criar uma composição do zero. Cores,
              nomes, números, patrocinadores e detalhes são pensados para o seu grupo.
            </p>
            <dl>
              <div>
                <dt>01</dt>
                <dd>Criação própria</dd>
              </div>
              <div>
                <dt>02</dt>
                <dd>Personalização completa</dd>
              </div>
              <div>
                <dt>03</dt>
                <dd>Atendimento humano</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="process" id="processo" aria-labelledby="process-title">
          <div className="process-heading">
            <p className="overline">DO PRIMEIRO CONTATO À SUA EQUIPE</p>
            <h2 id="process-title">Um pedido simples, em três conversas.</h2>
          </div>
          <ol className="process-list">
            <li>
              <span>01</span>
              <div>
                <h3>Escolha uma direção</h3>
                <p>Separe referências no catálogo ou conte a ideia que você já tem.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Ajuste com a gente</h3>
                <p>Alinhamos personalização, quantidades, tamanhos e acabamento.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Aprove e produza</h3>
                <p>Com tudo aprovado, sua identidade deixa a tela e ganha o jogo.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <p className="overline">PRONTO PARA COMEÇAR?</p>
          <div>
            <h2 id="final-title">Sua ideia merece sair do comum.</h2>
            <a
              className="button button-light"
              href={whatsappUrl("Olá! Quero começar meu projeto de uniforme personalizado com a Zorck Sport.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="whatsapp-icon" />
              Começar no WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <Brand />
          <p>Uniformes que carregam identidade.</p>
        </div>
        <nav aria-label="Links do rodapé">
          <a href="#inicio">Início</a>
          <a href="#catalogo">Catálogo</a>
          <a href="#processo">Como pedir</a>
        </nav>
        <div className="footer-contact">
          <a
            href={whatsappUrl(introductionMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp 11 99707-3939 — abre em nova guia"
          >
            <WhatsAppIcon className="whatsapp-icon" />
            11 99707-3939
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <InstagramGlyph />
            @zorcksport
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Zorck Sport</span>
          <span>São Paulo · Brasil</span>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={whatsappUrl(introductionMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa com a Zorck Sport no WhatsApp — abre em nova guia"
      >
        <WhatsAppIcon className="whatsapp-icon" />
        <span>WhatsApp</span>
      </a>
    </>
  );
}
