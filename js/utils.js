/**
 * RavenPort Utilities
 * Shared functions for better code quality and error handling
 */

// ==================== Storage Utilities ====================

/**
 * ดึงข้อมูลจาก localStorage พร้อม error handling
 * @param {string} key - localStorage key
 * @param {*} defaultValue - ค่า default ถ้าไม่พบข้อมูล
 * @returns {*} parsed data หรือ defaultValue
 */
function getStorageItem(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return defaultValue;
    }
}

/**
 * บันทึกข้อมูลลง localStorage พร้อม error handling
 * @param {string} key - localStorage key
 * @param {*} value - ข้อมูลที่ต้องการบันทึก
 * @returns {boolean} สำเร็จหรือไม่
 */
function setStorageItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error saving to localStorage key "${key}":`, error);
        // แจ้งเตือนถ้า storage เต็ม
        if (error.name === 'QuotaExceededError') {
            showToast('พื้นที่จัดเก็บข้อมูลเต็ม กรุณาลบข้อมูลเก่า', 'error');
        }
        return false;
    }
}

// ==================== Guest Mode ====================

/**
 * ตรวจสอบและจัดการ Guest Mode
 * ซ่อนปุ่มแก้ไข/ลบสำหรับผู้เยี่ยมชม
 */
function checkGuestMode() {
    const isGuest = getStorageItem('isGuest') === 'true';

    if (isGuest) {
        document.body.classList.add('guest-active');

        // Inject CSS เพื่อซ่อนปุ่มแก้ไข/ลบ
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

// ==================== UI Utilities ====================

/**
 * แสดง Toast Notification
 * @param {string} message - ข้อความที่จะแสดง
 * @param {string} type - ประเภท: 'success', 'error', 'info'
 */
function showToast(message, type = 'success') {
    // ลบ toast เก่าถ้ามี
    const oldToast = document.getElementById('global-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-6 right-6 z-[100] px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform translate-y-0 opacity-100';

    // สีตาม type
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

    // Animation เข้า
    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });

    // ลบหลัง 3 วินาที
    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * จัดรูปแบบตัวเลขเงิน
 * @param {number} amount - จำนวนเงิน
 * @returns {string} จำนวนเงินที่จัดรูปแบบแล้ว
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Validate form input
 * @param {HTMLInputElement} input - Input element
 * @param {string} errorMsg - ข้อความ error
 * @returns {boolean} valid หรือไม่
 */
function validateInput(input, errorMsg = 'กรุณากรอกข้อมูล') {
    if (!input.value.trim()) {
        input.classList.add('border-red-500');
        showToast(errorMsg, 'error');
        input.focus();
        return false;
    }
    input.classList.remove('border-red-500');
    return true;
}

// ==================== DOM Utilities ====================

/**
 * Cache DOM queries เพื่อประสิทธิภาพ
 */
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

// Export for ES modules (if needed)
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
