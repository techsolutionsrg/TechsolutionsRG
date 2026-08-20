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

// Base de dados das etapas
const stepData = {
    1: {
        title: "1. Diagnóstico & Engenharia de Projeto",
        deliverables: [
            "Levantamento detalhado de requisitos em campo (Portos, Indústrias e Usinas).",
            "Análise de adequação prévia à norma regulamentadora NR-10.",
            "Dimensionamento de carga para instalações elétricas e estruturas metálicas.",
            "Emissão do escopo de fornecimento e orçamento detalhado."
        ]
    },
    2: {
        title: "2. Caldeiraria Especializada & Fabricação",
        deliverables: [
            "Fabricação de tanques, reservatórios, chutes, moegas, silos e tubulações.",
            "Montagem de estruturas metálicas, passarelas, mezaninos, escadas e guarda-corpos.",
            "Soldagem de alta performance nos processos MIG/MAG, TIG e Eletrodo Revestido.",
            "Trabalhos em Aço Carbono, Inox e Alumínio com controle de qualidade."
        ]
    },
    3: {
        title: "3. Montagem & Infraestrutura Elétrica",
        deliverables: [
            "Montagem e parametrização de painéis elétricos, CCM e QGBT.",
            "Instalação de infraestrutura técnica: leitos, eletrocalhas, eletrodutos e perfilados.",
            "Lançamento e identificação rigorosa de cabos de força e comando.",
            "Montagem completa de malhas de aterramento e sistemas de proteção SPDA."
        ]
    },
    4: {
        title: "4. Comissionamento & Testes de Carga",
        deliverables: [
            "Testes de acionamento em motores elétricos (Partida Direta e Estrela-Triângulo).",
            "Configuração e ajustes finos em inversores de frequência e automação.",
            "Correção de problemas de fator de potência e inspeção termográfica.",
            "Entrega técnica do projeto homologado e pronto para operar."
        ]
    },
    5: {
        title: "5. Manutenção & Terceirização de Equipes",
        deliverables: [
            "Fornecimento por contrato de caldeireiros, soldadores, montadores e eletricistas.",
            "Execução ágil em paradas industriais programadas para menor tempo de inatividade.",
            "Contratos mensais de manutenção elétrica e mecânica preventiva/corretiva.",
            "Adequação contínua de segurança e reformas gerais em instalações antigas."
        ]
    }
};

// Função para Filtrar os Passos
function filterRoadmap(category, btnElement) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (btnElement) {
        btnElement.classList.add('active');
    }

    const steps = document.querySelectorAll('.roadmap-step');
    steps.forEach(step => {
        const stepCategories = step.getAttribute('data-category') || '';
        if (category === 'todos' || stepCategories.includes(category)) {
            step.style.display = 'block';
        } else {
            step.style.display = 'none';
        }
    });

    closePanel();
}

// Função para Selecionar o Passo e Exibir o Painel
function selectStep(stepNumber, cardElement) {
    const steps = document.querySelectorAll('.roadmap-step');
    steps.forEach(s => s.classList.remove('active'));
    
    if (cardElement) {
        cardElement.classList.add('active');
    }

    const data = stepData[stepNumber];
    if (!data) return;

    document.getElementById('panel-title').innerText = data.title;
    
    const deliverablesContainer = document.getElementById('panel-deliverables');
    deliverablesContainer.innerHTML = '';
    
    data.deliverables.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        deliverablesContainer.appendChild(li);
    });

    const ctaBtn = document.getElementById('panel-cta-btn');
    ctaBtn.href = `index.html#contato?servico=${encodeURIComponent(data.title)}`;

    const panel = document.getElementById('details-panel');
    panel.classList.add('active');

    // Rola a tela até o painel
    setTimeout(() => {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Função para Fechar o Painel
function closePanel() {
    const panel = document.getElementById('details-panel');
    if (panel) {
        panel.classList.remove('active');
    }
    
    const steps = document.querySelectorAll('.roadmap-step');
    steps.forEach(s => s.classList.remove('active'));
}

