(function () {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var imgEl = lightbox.querySelector('.lightbox-image');
    var captionEl = lightbox.querySelector('.lightbox-caption');
    var closeBtn = lightbox.querySelector('.lightbox-close');

    function openLightbox(src, caption) {
        imgEl.src = src;
        imgEl.alt = caption || '';
        captionEl.textContent = caption || '';
        lightbox.setAttribute('aria-hidden', 'false');
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.lightbox-img').forEach(function (img) {
        img.addEventListener('click', function (e) {
            e.preventDefault();
            var src = this.getAttribute('src');
            var caption = this.getAttribute('data-caption') || this.getAttribute('alt') || '';
            openLightbox(src, caption);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
})();
