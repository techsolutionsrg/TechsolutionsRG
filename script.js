document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    
    // 1. MENU MOBILE
    const toggleBtn = e.target.closest('#mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (toggleBtn && navMenu) {
      const isOpen = navMenu.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      return;
    }
    
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

    // 2. ROADMAP: FILTROS POR CATEGORIA
    const filterBtn = e.target.closest('.filter-btn');
    if (filterBtn) {
      const category = filterBtn.getAttribute('data-filter');
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      filterBtn.classList.add('active');
      
      document.querySelectorAll('.roadmap-step').forEach(step => {
        const stepCategory = step.getAttribute('data-category') || '';
        // CORREÇÃO: Utiliza split(' ') para identificar sub-tags
        if (!category || category === 'all' || stepCategory.split(' ').includes(category)) {
          step.style.display = 'block';
        } else {
          step.style.display = 'none';
        }
      });

      // Fechar modal lateral ao filtrar
      const detailsPanel = document.getElementById('details-panel');
      if (detailsPanel) detailsPanel.classList.remove('active');
      document.querySelectorAll('.roadmap-step').forEach(s => s.classList.remove('active'));
      return;
    }

    // 3. ROADMAP: EXIBIR / OCULTAR DETALHES DO PASSO
    const closePanelBtn = e.target.closest('.panel-close');
    if (closePanelBtn) {
      const panel = closePanelBtn.closest('.details-panel');
      if (panel) panel.classList.remove('active');
      document.querySelectorAll('.roadmap-step').forEach(s => s.classList.remove('active'));
      return;
    }

    const stepTrigger = e.target.closest('.roadmap-step');
    if (stepTrigger) {
      const detailsPanel = document.getElementById('details-panel');
      
      if (detailsPanel) {
        // CORREÇÃO: Puxa o título e lista do card clicado e insere no painel
        const title = stepTrigger.getAttribute('data-title');
        const deliverables = stepTrigger.getAttribute('data-deliverables');
        
        if (title && deliverables) {
            document.getElementById('panel-title').innerText = title;
            const ul = document.getElementById('panel-deliverables');
            ul.innerHTML = '';
            
            // Divide o texto do HTML pela barra "|"
            deliverables.split('|').forEach(item => {
                const li = document.createElement('li');
                li.innerText = item;
                ul.appendChild(li);
            });
        }

        const isCurrentlyActive = stepTrigger.classList.contains('active');
        document.querySelectorAll('.roadmap-step').forEach(s => s.classList.remove('active'));
        
        if (!isCurrentlyActive) {
          detailsPanel.classList.add('active');
          stepTrigger.classList.add('active');
          setTimeout(() => detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
        } else {
          detailsPanel.classList.remove('active');
        }
      }
    }
  });

  // 4. ANIMAÇÕES DE SCROLL REVEAL
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));
  }
});
