
// Toggle Mobile Menu
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function (event) {
    const menu = document.getElementById('navMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('navMenu').classList.remove('active');
    }
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Counter animation for stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + (target > 90 ? '%' : '+');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (target > 90 ? '%' : '+');
        }
    };

    updateCounter();
}

const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                animateCounter(counter);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');

    form.reset();


    // fetch('/api/contact', {
    //     method: 'POST',
    //     body: formData
    // });
}

// Resize handler
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        document.getElementById('navMenu').classList.remove('active');
    }
});

// Prevent scroll when mobile menu is open
const navMenu = document.getElementById('navMenu');
const observer2 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.target.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
});

observer2.observe(navMenu, {
    attributes: true,
    attributeFilter: ['class']
});
