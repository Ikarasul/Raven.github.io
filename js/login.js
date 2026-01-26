

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    localStorage.removeItem('raven_user');


    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('guest') === 'true') {

        guestLogin();
    }


    const form = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-msg');
    let attempts = 0;

    if (form) {

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const u = document.getElementById('username').value;
            const p = document.getElementById('password').value;

            if (u === 'Raven' && p === '12345678123') {
                localStorage.setItem('raven_user', JSON.stringify({ name: 'Raven', role: 'Admin' }));
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('isGuest', 'false');
                window.location.href = 'pages/p1.html';
            } else {
                attempts++;
                errorMsg.classList.remove('hidden');
                document.querySelector('.login-card').classList.add('animate-shake');
                setTimeout(() => document.querySelector('.login-card').classList.remove('animate-shake'), 500);

                if (attempts >= 3) {
                    alert('Too many failed attempts! Locked for 1 minute.');
                    const btnLogin = document.querySelector('.btn-login');
                    if (btnLogin) {
                        btnLogin.disabled = true;
                        btnLogin.style.opacity = '0.5';
                        setTimeout(() => {
                            attempts = 0;
                            btnLogin.disabled = false;
                            btnLogin.style.opacity = '1';
                        }, 60000);
                    }
                }
            }
        });
    }


    const guestBtn = document.querySelector('.btn-guest');
    if (guestBtn) {
        guestBtn.addEventListener('click', guestLogin);
    }

    const passwordToggleBtn = document.querySelector('.password-toggle');
    if (passwordToggleBtn) {
        passwordToggleBtn.addEventListener('click', togglePass);
    }
});


function guestLogin() {
    localStorage.setItem('isGuest', 'true');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('raven_user');
    window.location.href = 'p5.html';
}

function togglePass(event) {

    let btn = event.currentTarget;
    const input = document.getElementById('password');
    const icon = btn.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
    } else {
        input.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
    }
    lucide.createIcons();
}
