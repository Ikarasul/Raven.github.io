




function getStorageItem(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return defaultValue;
    }
}


function setStorageItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error saving to localStorage key "${key}":`, error);

        if (error.name === 'QuotaExceededError') {
            const isTh = (localStorage.getItem('raven_lang') || 'th') === 'th';
            showToast(isTh ? 'พื้นที่จัดเก็บข้อมูลเต็ม กรุณาลบข้อมูลเก่า' : 'Storage full. Please delete old data.', 'error');
        }
        return false;
    }
}




function checkGuestMode() {
    const isGuest = getStorageItem('isGuest') === 'true';

    if (isGuest) {
        document.body.classList.add('guest-active');


        if (!document.getElementById('guest-mode-style')) {
            const style = document.createElement('style');
            style.id = 'guest-mode-style';
            style.innerHTML = `
                .guest-active .admin-only,
                .guest-active button[onclick*="openEditModal"],
                .guest-active button[onclick*="openProjectModal"],
                .guest-active button[onclick*="openExpModal"],
                .guest-active button[onclick*="openApptModal"],
                .guest-active button[onclick*="openAboutModal"],
                .guest-active button[onclick*="openSkillsModal"],
                .guest-active button[onclick*="delete"],
                .guest-active button[onclick*="save"],
                .guest-active button[onclick*="add"],
                .guest-active #btn-add-exp {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}




function showToast(message, type = 'success') {

    const oldToast = document.getElementById('global-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-6 right-6 z-[100] px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform translate-y-0 opacity-100';


    const colors = {
        success: 'bg-emerald-500 text-white',
        error: 'bg-rose-500 text-white',
        info: 'bg-blue-500 text-white'
    };

    toast.className += ' ' + (colors[type] || colors.info);
    toast.innerHTML = `
        <div class="flex items-center gap-2 font-medium">
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(toast);


    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });


    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


function formatCurrency(amount) {
    return new Intl.NumberFormat('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}


function validateInput(input, errorMsg = null) {
    if (!errorMsg) {
        const isTh = (localStorage.getItem('raven_lang') || 'th') === 'th';
        errorMsg = isTh ? 'กรุณากรอกข้อมูล' : 'Please fill in this field';
    }
    if (!input.value.trim()) {
        input.classList.add('border-red-500');
        showToast(errorMsg, 'error');
        input.focus();
        return false;
    }
    input.classList.remove('border-red-500');
    return true;
}




const DOM = {
    cache: {},
    get(selector) {
        if (!this.cache[selector]) {
            this.cache[selector] = document.querySelector(selector);
        }
        return this.cache[selector];
    },
    getAll(selector) {
        return document.querySelectorAll(selector);
    }
};


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getStorageItem,
        setStorageItem,
        checkGuestMode,
        showToast,
        formatCurrency,
        validateInput,
        DOM
    };
}
