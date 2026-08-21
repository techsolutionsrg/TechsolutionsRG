document.addEventListener('DOMContentLoaded', () => {
  
  // Event Delegation Unificada para Interações Globais
  document.addEventListener('click', (e) => {
    
    // ==========================================
    // 1. MENU MOBILE
    // ==========================================
    const toggleBtn = e.target.closest('#mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (toggleBtn && navMenu) {
      const isOpen = navMenu.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isOpen);

      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
      return;
    }

    // Fechar menu mobile ao clicar em links
    if (e.target.closest('#nav-menu a')) {
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const btn = document.getElementById('mobile-toggle');
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
          const icon = btn.querySelector('i');
          if (icon) icon.className = 'fa-solid fa-bars';
        }
      }
    }

    // ==========================================
    // 2. ROADMAP: FILTROS POR CATEGORIA
    // ==========================================
    const filterBtn = e.target.closest('.filter-btn');
    if (filterBtn) {
      const category = filterBtn.getAttribute('data-filter');
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      filterBtn.classList.add('active');

      const steps = document.querySelectorAll('.roadmap-step');
      steps.forEach(step => {
        const stepCategory = step.getAttribute('data-category');
        if (!category || category === 'all' || stepCategory === category) {
          step.style.display = 'block';
        } else {
          step.style.display = 'none';
        }
      });
      return;
    }

    // ==========================================
    // 3. ROADMAP: EXIBIR / OCULTAR DETALHES DO PASSO
    // ==========================================
    const stepTrigger = e.target.closest('.click-action-trigger, .roadmap-step, [data-target]');
    const closePanelBtn = e.target.closest('.panel-close');

    // Botão de Fechar Painel de Detalhes (se houver)
    if (closePanelBtn) {
      const panel = closePanelBtn.closest('.details-panel');
      if (panel) panel.classList.remove('active');
      document.querySelectorAll('.roadmap-step').forEach(s => s.classList.remove('active'));
      return;
    }

    if (stepTrigger) {
      const stepCard = stepTrigger.closest('.roadmap-step') || stepTrigger;
      const targetSelector = stepTrigger.getAttribute('data-target') || stepCard.getAttribute('data-target');
      
      // Procura o painel de detalhes no card atual ou painel global
      let detailsPanel = targetSelector ? document.querySelector(targetSelector) : null;
      if (!detailsPanel) {
        detailsPanel = stepCard.querySelector('.details-panel') || document.getElementById('details-panel');
      }

      const isCurrentlyActive = stepCard.classList.contains('active');

      if (detailsPanel) {
        const isPanelActive = detailsPanel.classList.contains('active');
        
        // Alterna os estados ativos
        document.querySelectorAll('.details-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.roadmap-step').forEach(s => s.classList.remove('active'));

        if (!isPanelActive || !isCurrentlyActive) {
          detailsPanel.classList.add('active');
          stepCard.classList.add('active');
        }
      } else {
        // Fallback para toggle de classe direto na div do card
        stepCard.classList.toggle('active');
      }
    }
  });

  // ==========================================
  // 4. ANIMAÇÕES DE SCROLL REVEAL
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }
});