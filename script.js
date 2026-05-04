document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 1000, once: true });

    // Animación de números
    const counters = document.querySelectorAll('.counter');
    const animateNumbers = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const step = target / 100;
            
            counter.classList.add('counting');
            
            const timer = setInterval(() => {
                count += step;
                if (count >= target) {
                    counter.innerText = target + (target === 100 ? '%' : '+');
                    counter.classList.remove('counting');
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.ceil(count);
                }
            }, 20);
        });
    };

    // Observer para activar números al ver la sección
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });

    const statsSec = document.querySelector('.stats');
    if (statsSec) observer.observe(statsSec);

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.top = "10px";
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.8)";
            navbar.style.top = "20px";
        }
    });
});