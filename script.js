// Alternar menu móvel
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    const body = document.body;
    menu.classList.toggle('active');

    // Previne scroll quando menu está aberto
    if (menu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

// Fechar menu ao clicar fora
document.addEventListener('click', function (event) {
    const menu = document.getElementById('navMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
        menu.classList.remove('active');
        document.body.style.overflow = '';
    }
});


function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        document.getElementById('navMenu').classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Rolagem suave para todos os links interligados
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if (targetId) {
            scrollToSection(targetId);
        }
    });
});

// Efeito de rolagem do cabeçalho
let lastScroll = 0;
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

//animação scrol
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Se for um card de estatística, anima o contador
            if (entry.target.classList.contains('stat-card')) {
                const counter = entry.target.querySelector('.stat-number');
                if (counter && !counter.classList.contains('animated')) {
                    animateCounter(counter);
                    counter.classList.add('animated');
                }
            }
        }
    });
}, observerOptions);

// Observe todos os elementos com a classe animate-on-scroll
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Animação de contador para estatísticas
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            if (target > 90) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (target > 90) {
                element.textContent = target + '%';
            } else {
                element.textContent = target + '+';
            }
        }
    };

    updateCounter();
}

// Tab functionality
let currentTab = 0;

function changeTab(tabIndex) {
    // Remove a classe ativa de todas as guias e painéis
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    // Adicionar classe ativa à aba e painel selecionados
    document.querySelectorAll('.tab-btn')[tabIndex].classList.add('active');
    document.getElementById(`tab-${tabIndex}`).classList.add('active');

    currentTab = tabIndex;
}

// WhatsApp função
function openWhatsApp() {
    // Substitua pelo número real do WhatsApp (com código do país)
    const phoneNumber = '5571981113728'; // Formato: 55 (Brasil) + DDD + Número
    const message = encodeURIComponent('Olá! Gostaria de agendar uma consulta sobre concurso público.'); //Mensagem pre pronta
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappURL, '_blank');
}

// Envio do formulário
function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Cria objeto com os dados do formulário
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Aqui você pode integrar com seu backend/API
    console.log('Dados do formulário:', data);

    alert('✅ Mensagem enviada com sucesso!\n\nEntraremos em contato em breve.');

    // Limpa o formulário
    form.reset();

    setTimeout(() => {
        openWhatsApp();
    }, 1000);

    // Exemplo de integração com API para futuras melhorias:
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert('Mensagem enviada com sucesso!');
        form.reset();
    })
    .catch(error => {
        alert('Erro ao enviar mensagem. Tente novamente.');
        console.error('Erro:', error);
    });
    */
}

// Manipulador de redimensionamento
let resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        if (window.innerWidth > 768) {
            const menu = document.getElementById('navMenu');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// Lazy loading para imagens (se necessário)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback para navegadores antigos
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Previne envio duplicado de formulário
let formSubmitting = false;
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        if (formSubmitting) {
            e.preventDefault();
            return false;
        }
        formSubmitting = true;
        setTimeout(() => {
            formSubmitting = false;
        }, 3000);
    });
});

// Máscara para telefone
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }

        e.target.value = value;
    });
});

// Google Analytics (opcional - adicione seu código de tracking)
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-XXXXXXXXX-X');
*/

// Facebook Pixel (opcional - adicione seu código de pixel)
/*
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
*/

// Monitoramento de perfomace (opcional)
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log('Performance:', entry.name, entry.duration);
        }
    });
    observer.observe({ entryTypes: ['measure', 'navigation'] });
}

// Service Worker para PWA (opcional)
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
}
*/

console.log('Site Ribeiro Reis Advocacia carregado com sucesso.');