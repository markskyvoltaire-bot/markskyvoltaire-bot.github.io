document.addEventListener('DOMContentLoaded', () => {
    // ==========================
    // FADE-IN SECTIONS ON SCROLL
    // ==========================
    const faders = document.querySelectorAll('.fade-in');

    const options = {
        threshold: 0.3, // trigger when 30% of element is visible
        rootMargin: '0px 0px -50px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    faders.forEach(fader => appearOnScroll.observe(fader));

    // ==========================
    // LIGHTBOX FUNCTIONALITY
    // ==========================
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const lightboxOverlay = document.getElementById('lightbox-overlay');

    // Only proceed if the overlay exists
    if (lightboxOverlay) {
        const lightboxImg = lightboxOverlay.querySelector('img');

        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                if (lightboxImg) {
                    lightboxImg.src = img.getAttribute('src');
                    lightboxOverlay.classList.add('show');
                    lightboxOverlay.style.display = 'flex';
                }
            });
        });

        lightboxOverlay.addEventListener('click', () => {
            lightboxOverlay.classList.remove('show');
            setTimeout(() => {
                lightboxOverlay.style.display = 'none';
                if (lightboxImg) lightboxImg.src = '';
            }, 400);
        });
    }
});
