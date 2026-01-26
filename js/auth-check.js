


(function () {

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isGuest = localStorage.getItem('isGuest') === 'true';


    const currentPage = window.location.pathname.split('/').pop();









    if (currentPage === 'index.html' || currentPage === '') {
        return;
    }



    const guestAllowedPages = [
        'p1.html',
        'p2.html',
        'p5.html'
    ];


    let cleanPage = currentPage.toLowerCase().split('?')[0].split('#')[0];


    if (cleanPage === '' || cleanPage === '/') {
        cleanPage = 'index.html';
    }


    if (!isLoggedIn && !isGuest) {

        if (cleanPage === 'index.html' || cleanPage === '') {
            return;
        }

        const inPages = window.location.pathname.includes('/pages/');
        window.location.href = inPages ? '../index.html' : 'index.html';
        return;
    }


    const isAllowed = guestAllowedPages.some(allowed =>
        cleanPage === allowed.toLowerCase() ||
        cleanPage.endsWith(allowed.toLowerCase())
    );

    if (isGuest && !isAllowed) {



        const inPages = window.location.pathname.includes('/pages/');
        window.location.href = inPages ? 'p1.html' : 'pages/p1.html';
        return;
    }


    if (isLoggedIn) {

    } else if (isGuest) {

    }
})();
