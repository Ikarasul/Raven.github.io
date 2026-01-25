// Auto-add fade-in-up class to cards on page load
(function () {
    window.addEventListener('DOMContentLoaded', () => {
        // Add animations to glass cards
        const cards = document.querySelectorAll('.glass, .card, [class*="glass"], [class*="card"]');
        cards.forEach((card, index) => {
            // Don't animate navigation or chatbot
            if (!card.closest('nav') && !card.closest('.chat-widget') && !card.closest('#profile-dropdown')) {
                card.classList.add('fade-in-up');
                card.style.animationDelay = `${index * 0.1}s`;
            }
        });
    });
})();
