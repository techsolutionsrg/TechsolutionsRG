// Web Component: Header Global
class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <div class="container header-container">
          <a href="index.html" class="logo">
            <i class="fa-solid fa-code logo-icon"></i> Tech Solutions RG
          </a>
          <nav class="nav-menu" id="nav-menu">
            <a href="index.html">Home</a>
            <a href="index.html#servicos">Serviços</a>
            <a href="roadmap_servicos.html">Roadmap</a>
            <a href="index.html#contato" class="btn btn-primary mobile-menu-cta">Contato</a>
          </nav>
          <button class="mobile-toggle" id="mobile-toggle" aria-label="Abrir Menu" aria-expanded="false">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>
    `;
  }
}

// Web Component: Footer Global
class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="container footer-container">
          <div class="footer-info">
            <h4>Tech Solutions RG</h4>
            <p>Provedor completo de infraestrutura mecânica e elétrica. Atendemos desde demandas pontuais até a gestão integral de grandes paradas industriais.</p>
          </div>
          <div>
            <h5>Navegação</h5>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="index.html#servicos">Serviços</a></li>
              <li><a href="roadmap_servicos.html">Roadmap de Serviços</a></li>
            </ul>
          </div>
          <div>
            <h5>Contato</h5>
            <ul>
              <li><a href="index.html#contato">Solicitar Orçamento</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 E. de O. Xavier & Cia LTDA - Todos os direitos reservados.</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-header', AppHeader);
customElements.define('app-footer', AppFooter);
