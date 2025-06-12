// script_optimized.js - Gilberto Tour - Versão Otimizada

// Função de navegação entre páginas com transição suave
function irPara(destino) {
    // Adiciona uma pequena animação antes da navegação
    document.body.style.opacity = '0.8';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = destino;
    }, 200);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    // Configuração do link do WhatsApp
    const whatsappLink = document.querySelector('.whatsapp-float');
    if (whatsappLink) {
        whatsappLink.href = "https://wa.me/558584127344?text=Olá,%20quero%20mais%20informações%20sobre%20os%20passeios.";
    }

    // Animação de entrada para os cards de destino
    const destinoCards = document.querySelectorAll('.destino-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    destinoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Efeito de parallax suave para a seção de destaque
    const destaque = document.querySelector('.destaque');
    if (destaque) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            destaque.style.transform = `translateY(${rate}px)`;
        });
    }

    // Lazy loading para imagens
    const images = document.querySelectorAll('.destino-image');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Força o carregamento
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Adiciona efeito de ripple aos botões
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Aplica o efeito ripple aos botões de destino
    const buttons = document.querySelectorAll('.destino-button');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Preload de imagens importantes
    const importantImages = [
        'Logo Gilberto Tour oficial.png',
        '3praias.png'
    ];

    importantImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Analytics de interação
    function trackInteraction(action, element) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': 'engagement',
                'event_label': element
            });
        }
    }

    // Rastrear cliques nos destinos
    destinoCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const destinoName = card.querySelector('.destino-title').textContent;
            trackInteraction('destino_click', destinoName);
        });
    });

    // Rastrear clique no WhatsApp
    if (whatsappLink) {
        whatsappLink.addEventListener('click', () => {
            trackInteraction('whatsapp_click', 'contact');
        });
    }

    // Adiciona classe para indicar que o JavaScript foi carregado
    document.body.classList.add('js-loaded');
});

// Função para otimizar performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Otimiza o evento de scroll
const optimizedScrollHandler = debounce(() => {
    // Código de scroll otimizado aqui
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// CSS para o efeito ripple
const style = document.createElement('style');
style.textContent = `
    .destino-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .js-loaded .destino-image {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

