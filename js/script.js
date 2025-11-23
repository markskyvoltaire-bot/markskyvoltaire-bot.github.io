// Fade-in sections on scroll
document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');

    const options = {
        threshold: 0.3, // trigger when 30% of element is visible
        rootMargin: '0px 0px -50px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // stop observing once shown
            }
        });
    }, options);

    faders.forEach(fader => appearOnScroll.observe(fader));
});
