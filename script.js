// Alternar menu mobile (abre/fecha)
function alternarMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('ativo');
}

// Fechar menu ao clicar fora
document.addEventListener('click', function (evento) {
    const menu = document.getElementById('navMenu');
    const botaoMenu = document.querySelector('.mobile-menu-btn');

    if (!menu.contains(evento.target) && !botaoMenu.contains(evento.target)) {
        menu.classList.remove('ativo');
    }
});

// Rolagem suave até uma seção
function rolarParaSecao(idSecao) {
    const secao = document.getElementById(idSecao);
    if (secao) {
        secao.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('navMenu').classList.remove('ativo');
    }
}

// Rolagem suave para todos os links âncora
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const alvoId = this.getAttribute('href').substring(1);
        rolarParaSecao(alvoId);
    });
});

// Efeito no cabeçalho ao rolar a página
window.addEventListener('scroll', function () {
    const cabecalho = document.getElementById('header');
    if (window.scrollY > 50) {
        cabecalho.classList.add('rolado');
    } else {
        cabecalho.classList.remove('rolado');
    }
});

// Animação ao rolar (revela elementos)
const opcoesObservador = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('ativo');
        }
    });
}, opcoesObservador);

// Observar todos os elementos com classe 'animate-on-scroll'
document.querySelectorAll('.animate-on-scroll').forEach(elemento => {
    observador.observe(elemento);
});

// Animação de contador (ex: números de estatísticas)
function animarContador(elemento) {
    const alvo = parseInt(elemento.getAttribute('data-target'));
    const duracao = 2000;
    const incremento = alvo / (duracao / 16);
    let atual = 0;

    const atualizarContador = () => {
        atual += incremento;
        if (atual < alvo) {
            elemento.textContent = Math.floor(atual) + (alvo > 90 ? '%' : '+');
            requestAnimationFrame(atualizarContador);
        } else {
            elemento.textContent = alvo + (alvo > 90 ? '%' : '+');
        }
    };

    atualizarContador();
}

const observadorEstatisticas = new IntersectionObserver(function (entradas) {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            const contadores = entrada.target.querySelectorAll('.stat-number');
            contadores.forEach(contador => {
                animarContador(contador);
            });
            observadorEstatisticas.unobserve(entrada.target);
        }
    });
}, { threshold: 0.5 });

const secaoEstatisticas = document.querySelector('.stats-section');
if (secaoEstatisticas) {
    observadorEstatisticas.observe(secaoEstatisticas);
}

// Envio do formulário de contato
async function enviarFormulario(evento) {
    evento.preventDefault();

    const formulario = evento.target;
    const dadosFormulario = new FormData(formulario);

    try {
        // Exemplo de envio para uma API
        const resposta = await fetch('/api/contato', {
            method: 'POST',
            body: dadosFormulario
        });

        if (resposta.ok) {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            formulario.reset();
        } else {
            alert('Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
        }

    } catch (erro) {
        console.error('Erro ao enviar formulário:', erro);
        alert('Falha de conexão com o servidor.');
    }
}

// Fechar menu se a tela for redimensionada para desktop
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        document.getElementById('navMenu').classList.remove('ativo');
    }
});

// Impedir rolagem da página quando o menu mobile está aberto
const menuNavegacao = document.getElementById('navMenu');
const observadorMenu = new MutationObserver(function (mutacoes) {
    mutacoes.forEach(function (mutacao) {
        if (mutacao.target.classList.contains('ativo')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
});

observadorMenu.observe(menuNavegacao, {
    attributes: true,
    attributeFilter: ['class']
});
