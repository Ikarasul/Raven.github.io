
(function () {
    window.addEventListener('DOMContentLoaded', () => {

        const cards = document.querySelectorAll('.glass, .card, [class*="glass"], [class*="card"]');
        cards.forEach((card, index) => {

            if (!card.closest('nav') && !card.closest('.chat-widget') && !card.closest('#profile-dropdown')) {
                card.classList.add('fade-in-up');
                card.style.animationDelay = `${index * 0.1}s`;
            }
        });
    });
})();
