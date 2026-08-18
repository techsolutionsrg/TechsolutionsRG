document.addEventListener('DOMContentLoaded', () => {

    // 1. Menu Mobile Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 2. Animação de Scroll via Intersection Observer (UI/UX Fluidity)
    const observerOptions = {
        threshold: 0.15
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealOnScroll.observe(el));

    // 3. Simulação de Pipeline de CRM de Vendas no Formulário
    const crmForm = document.getElementById('crm-form');
    const formStatus = document.getElementById('form-status');

    if (crmForm) {
        crmForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const leadData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };

            formStatus.style.color = '#00B2B2';
            formStatus.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando dados com inteligência comercial...';

            setTimeout(() => {
                console.log('Lead integrado ao CRM com sucesso:', leadData);
                formStatus.style.color = '#4ADE80';
                formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Solicitação enviada! Um especialista comercial entrará em contato.';
                crmForm.reset();
            }, 1200);
        });
    }
});
