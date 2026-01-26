

(function initGuestMode() {
    const isGuest = localStorage.getItem('isGuest') === 'true';

    if (isGuest) {
        console.log("🔒 Guest Mode Active: Enforcing Read-Only");
        document.body.classList.add('visitor-view');


        const style = document.createElement('style');
        style.innerHTML = `

            .visitor-view button[onclick^="open"], 
            .visitor-view button[onclick^="delete"], 
            .visitor-view button[onclick^="save"], 
            .visitor-view button[onclick^="toggle"],
            .visitor-view .admin-only {
                display: none !important;
            }
            


        `;
        document.head.appendChild(style);




        if (window.updateTranslations) window.updateTranslations();
    }
})();
