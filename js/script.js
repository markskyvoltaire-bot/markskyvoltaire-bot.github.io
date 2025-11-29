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
    const lightboxImg = lightboxOverlay.querySelector('img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.getAttribute('src'); // works with lazy-loaded images
            lightboxOverlay.classList.add('show');
        });
    });

    lightboxOverlay.addEventListener('click', () => {
        lightboxOverlay.classList.remove('show');
        setTimeout(() => lightboxImg.src = '', 400);
    });

    // ==========================
    // AUDIO INDICATOR / AUTOPLAY
    // ==========================
    const audio = document.getElementById('pageAudio');
    const indicator = document.getElementById('audioIndicator');
    let volume = 0;
    audio.volume = volume;

    audio.play().catch(() => console.log("Autoplay blocked. Click indicator to play."));

    // Smooth fade-in for audio
    const fadeInAudio = setInterval(() => {
        if (volume < 0.5) {
            volume += 0.01;
            audio.volume = volume;
        } else {
            clearInterval(fadeInAudio);
        }
    }, 100);

    function updateIndicator() {
        if (!audio.paused) {
            indicator.classList.add('playing');
            indicator.textContent = "🎵";
        } else {
            indicator.classList.remove('playing');
            indicator.textContent = "🔇";
        }
    }

    indicator.addEventListener('click', () => {
        if (audio.paused) audio.play();
        else audio.pause();
        updateIndicator();
    });

    // Auto-play on first user interaction (some browsers block autoplay)
    document.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            updateIndicator();
        }
    }, { once: true });

    updateIndicator();
});
