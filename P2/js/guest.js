/**
 * guest.js
 * Handles Visitor Mode (Guest) restrictions.
 * Logic: Hides edit/action buttons for Read-Only access.
 */

(function initGuestMode() {
    const isGuest = localStorage.getItem('isGuest') === 'true';

    if (isGuest) {
        console.log("🔒 Guest Mode Active: Enforcing Read-Only");
        document.body.classList.add('visitor-view');

        // Styles
        const style = document.createElement('style');
        style.innerHTML = `
            /* Hide Edit Buttons & Modals */
            .visitor-view button[onclick^="open"], 
            .visitor-view button[onclick^="delete"], 
            .visitor-view button[onclick^="save"], 
            .visitor-view button[onclick^="toggle"],
            .visitor-view .admin-only {
                display: none !important;
            }
            
            /* Banner */

        `;
        document.head.appendChild(style);



        // Trigger translation update if available
        if (window.updateTranslations) window.updateTranslations();
    }
})();
