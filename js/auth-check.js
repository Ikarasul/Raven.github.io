/**
 * auth-check.js
 * Authentication Guard - Redirects to login if not authenticated
 * Place this script at the TOP of every protected page
 */

(function () {
    // Check authentication status
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isGuest = localStorage.getItem('isGuest') === 'true';

    // Get current page
    const currentPage = window.location.pathname.split('/').pop();

    // Debug logging
    console.log('🔍 Auth Check:', {
        currentPage,
        isLoggedIn,
        isGuest,
        pathname: window.location.pathname
    });

    if (currentPage === 'index.html' || currentPage === '') {
        return;
    }

    // Define pages that guests are allowed to view
    // Use lower case for comparison
    const guestAllowedPages = [
        'p1.html',
        'p2.html',
        'p5.html'
    ];

    // Normalize current page (lowercase, remove query/hash)
    let cleanPage = currentPage.toLowerCase().split('?')[0].split('#')[0];

    // Handle root path or directory index
    if (cleanPage === '' || cleanPage === '/') {
        cleanPage = 'index.html';
    }

    // If not logged in AND not guest, redirect to login (index.html is LOGIN)
    if (!isLoggedIn && !isGuest) {
        // If we are already at root (index.html), stay there.
        if (cleanPage === 'index.html' || cleanPage === '') {
            return;
        }
        console.log('🔒 Not authenticated - Redirecting to login...');
        const inPages = window.location.pathname.includes('/pages/');
        window.location.href = inPages ? '../index.html' : 'index.html';
        return;
    }

    // Check if allowed (relaxed matching)
    const isAllowed = guestAllowedPages.some(allowed =>
        cleanPage === allowed.toLowerCase() ||
        cleanPage.endsWith(allowed.toLowerCase())
    );

    if (isGuest && !isAllowed) {
        console.warn('🚫 Guest access denied for:', cleanPage);
        console.warn('📋 Allowed:', guestAllowedPages);
        // Redirect to Dashboard (p1.html) if denied
        const inPages = window.location.pathname.includes('/pages/');
        window.location.href = inPages ? 'p1.html' : 'pages/p1.html';
        return;
    }

    // Log authentication status
    if (isLoggedIn) {
        console.log('✅ Matches: Admin Mode');
    } else if (isGuest) {
        console.log('👁️ Matches: Guest Mode (' + cleanPage + ')');
    }
})();
