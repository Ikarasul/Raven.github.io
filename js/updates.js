

const UPDATES_DATA = {
    academic: [
        {
            type: 'announce',
            date: '15 ธ.ค. 2568',
            title: 'ตารางสอบ (เม.ย. 2569)',
            desc: 'อาจมีการเปลี่ยนแปลง เนื่องจากอ้างอิงจากตารางลงทะเบียนเรียนครับ',
            icon: 'calendar-clock',
            color: 'rose',
            badge: 'ประกาศ'
        }
    ],
    system: [
        {
            type: 'new',
            date: '24 ธ.ค. 2568',
            title: 'ระบบพยากรณ์อากาศ',
            desc: 'เช็คสภาพอากาศได้แล้ว! แค่ถาม "อากาศวันนี้" รองรับระบบระบุพิกัดอัตโนมัติ',
            icon: 'cloud-sun',
            color: 'cyan',
            badge: 'ใหม่'
        },
        {
            type: 'update',
            date: '23 ธ.ค. 2568',
            title: 'อัปเดต Whitebird Avatar',
            desc: 'เปลี่ยนโฉม Whitebird เป็นสาวบันนี่สุดน่ารัก พร้อมบริการช่วยเหลือนักศึกษา',
            icon: 'sparkles',
            color: 'pink',
            badge: 'อัปเดต'
        },
        {
            type: 'new',
            date: '19 ธ.ค. 2568',
            title: 'Bottom Navigation แบบ YouTube',
            desc: 'เพิ่ม Bottom Nav สำหรับมือถือ พร้อม Dropdown การเรียน/ชีวิต + Chatbot ปรับตำแหน่ง',
            icon: 'smartphone',
            color: 'blue',
            badge: 'ใหม่'
        },
        {
            type: 'new',
            date: '19 ธ.ค. 2568',
            title: 'Chatbot "Whitebird" (ไวท์เบิร์ด)',
            desc: 'เปลี่ยนชื่อและ persona เป็นผู้หญิง พูด "ค่ะ/หนู" + QR Code สำหรับ Guest Mode',
            icon: 'message-circle-heart',
            color: 'pink',
            badge: 'ใหม่'
        },
        {
            type: 'fix',
            date: '19 ธ.ค. 2568',
            title: 'ซิงค์ข้อมูลผลงาน',
            desc: 'ผลงานระหว่าง index.html และ p5.html แสดงตรงกันแล้ว ดึงจาก localStorage เดียวกัน',
            icon: 'refresh-ccw',
            color: 'green',
            badge: 'แก้ไข'
        },
        {
            type: 'fix',
            date: '19 ธ.ค. 2568',
            title: 'เพิ่มประสิทธิภาพระบบ',
            desc: 'เพิ่ม Preconnect hints, Meta tags SEO, utils.js และปรับ Typography ทั้งระบบ',
            icon: 'zap',
            color: 'yellow',
            badge: 'แก้ไข'
        },
        {
            type: 'new',
            dateKey: 'p1_up_ui_date',
            titleKey: 'p1_up_ui_title',
            descKey: 'p1_up_ui_desc',
            icon: 'layout',
            color: 'violet',
            badgeKey: 'p1_badge_new'
        },
        {
            type: 'new',
            dateKey: 'p1_up_v2_date',
            titleKey: 'p1_up_v2_title',
            descKey: 'p1_up_v2_desc',
            icon: 'sparkles',
            color: 'blue',
            badgeKey: 'p1_badge_new'
        },
        {
            type: 'fix',
            dateKey: 'p1_up_music_date',
            titleKey: 'p1_up_music_title',
            descKey: 'p1_up_music_desc',
            icon: 'music',
            color: 'green',
            badgeKey: 'p1_badge_fix'
        },
        {
            type: 'fix',
            dateKey: 'p1_up_nav_date',
            titleKey: 'p1_up_nav_title',
            descKey: 'p1_up_nav_desc',
            icon: 'mouse-pointer-click',
            color: 'emerald',
            badgeKey: 'p1_badge_fix'
        },
        {
            type: 'alert',
            dateKey: 'p1_up_maint_date',
            titleKey: 'p1_up_maint_title',
            descKey: 'p1_up_maint_desc',
            icon: 'alert-circle',
            color: 'orange',
            badgeKey: 'p1_badge_alert'
        }
    ]
};



function renderUpdatesWidget() {
    const container = document.getElementById('updates-widget-container');
    if (!container) return;

    container.innerHTML = `
        <div class="lumi-card bg-white/80 flex flex-col justify-between relative overflow-hidden h-full" style="min-height: 320px;">

            <div class="flex items-center justify-between mb-5 z-10 relative">
                <h3 class="font-bold text-slate-800 flex items-center gap-2.5 text-base">
                     <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span> 
                     <span data-i18n="p1_updates_title">Updates</span>
                </h3>
                

                <div class="flex bg-slate-100/80 p-1 rounded-lg">
                    <button onclick="switchTab('academic')" id="tab-academic" 
                        class="px-3.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all bg-white text-rose-500 shadow-sm" 
                        data-i18n="p1_tab_academic">Academic</button>
                    <button onclick="switchTab('system')" id="tab-system" 
                        class="px-3.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all text-slate-400 hover:text-slate-600" 
                        data-i18n="p1_tab_system">System</button>
                </div>
            </div>


            <div class="relative z-10 flex-1 mb-4">

                <div id="widget-content-academic" class="animate-fade-in">
                    ${getLatestItemHTML(UPDATES_DATA.academic[0], 'rose')}
                </div>
                

                <div id="widget-content-system" class="hidden animate-fade-in">
                     ${getLatestItemHTML(UPDATES_DATA.system[0], 'blue')}
                </div>
            </div>


            <button class="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-auto z-10 relative" onclick="openUpdatesModal()">
                <span data-i18n="p1_updates_view">View All</span> <i data-lucide="list" width="14"></i>
            </button>
        </div>
    `;


    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function getLatestItemHTML(item, themeColor) {
    if (!item) return '';
    return `
    <a href="${item.link || 'P2.html'}" class="flex items-center justify-between p-5 bg-slate-50/50 border border-slate-200/80 rounded-2xl hover:bg-${themeColor}-50 hover:border-${themeColor}-200 transition-all cursor-pointer group shadow-sm hover:shadow-md">
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-${themeColor}-100 text-${themeColor}-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <i data-lucide="${item.icon}" width="22"></i>
            </div>
            <div>
                <div class="font-bold text-slate-800 text-sm group-hover:text-${themeColor}-600 transition-colors mb-1">${item.title}</div>
                <div class="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">${item.date}</div>
            </div>
        </div>
        <i data-lucide="chevron-right" width="18" class="text-slate-300 group-hover:text-${themeColor}-500 transition-colors"></i>
    </a>
    `;
}



function renderUpdatesModal() {
    const container = document.getElementById('updates-modal-container');
    if (!container) return;


    container.innerHTML = `
        <div id="update-modal" class="fixed inset-0 z-50 hidden">

            <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity opacity-0" id="modal-backdrop" onclick="closeUpdatesModal()"></div>
            
            <!-- Content --><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl p-8 bg-white rounded-3xl shadow-2xl transform scale-95 opacity-0 transition-all duration-300 flex flex-col max-h-[85vh]" id="modal-content">
                

                <div class="flex items-center justify-between mb-6 flex-shrink-0 pb-4 border-b border-slate-100">
                    <h3 class="text-2xl font-black text-slate-800 flex items-center gap-3">
                        <i data-lucide="bell-ring" class="text-amber-500" width="28"></i> <span data-i18n="p1_logs_title">Update Logs</span>
                    </h3>
                    <button onclick="closeUpdatesModal()" class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                        <i data-lucide="x" width="18"></i>
                    </button>
                </div>


                <div class="flex bg-slate-100/80 p-1.5 rounded-xl mb-5 flex-shrink-0">
                    <button onclick="switchModalTab('academic')" id="modal-tab-academic" 
                        class="flex-1 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all bg-white text-rose-500 shadow-sm flex items-center justify-center gap-2">
                        <i data-lucide="graduation-cap" width="18"></i> <span data-i18n="p1_tab_academic">Academic</span>
                    </button>
                    <button onclick="switchModalTab('system')" id="modal-tab-system" 
                        <class="flex-1 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all text-slate-400 hover:text-slate-600 flex items-center justify-center gap-2">
                        <i data-lucide="cpu" width="18"></i> <span data-i18n="p1_tab_system">System</span>
                    </button>
                </div>


                <div class="overflow-y-auto custom-scrollbar flex-1 pt-2">
                    

                    <div id="modal-content-academic" class="space-y-3.5 animate-fade-in">
                        ${UPDATES_DATA.academic.slice(0, 5).map((item, i) => getLogItemHTML(item, 'rose', 'academic-' + i)).join('')}
                    </div>


                    <div id="modal-content-system" class="space-y-3.5 hidden animate-fade-in">
                        ${UPDATES_DATA.system.slice(0, 5).map((item, i) => getLogItemHTML(item, 'blue', 'system-' + i)).join('')}
                    </div>

                </div>
            </div>
        </div>
    `;
}


function getLogItemHTML(item, color, id) {
    return `
    <div class="p-5 rounded-2xl bg-${color}-50/50 border border-${color}-100 hover:bg-${color}-100/50 transition-all">
        <div class="flex justify-between items-start mb-3">
            <span class="badge bg-${item.color}-500 text-white text-[10px] px-2.5 py-1 rounded-full shadow-sm font-bold uppercase tracking-wide">${item.badge}</span>
            <span class="text-[11px] text-${color}-400 font-bold uppercase tracking-wide">${item.date}</span>
        </div>
        <h5 class="font-bold text-slate-800 text-base mb-2 leading-snug">${item.title}</h5>
        <div class="relative">
            <p id="desc-${id}" class="text-sm text-slate-600 transition-all duration-300 leading-relaxed">${item.desc}</p>
        </div>
    </div>
    `;
}




function switchTab(tab) {
    const btnAc = document.getElementById('tab-academic');
    const btnSys = document.getElementById('tab-system');
    const contentAc = document.getElementById('widget-content-academic');
    const contentSys = document.getElementById('widget-content-system');

    if (tab === 'academic') {
        btnAc.className = "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all bg-white text-rose-500 shadow-sm";
        btnSys.className = "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all text-slate-400 hover:text-slate-600";
        contentAc.classList.remove('hidden');
        contentSys.classList.add('hidden');
    } else {
        btnSys.className = "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all bg-white text-blue-500 shadow-sm";
        btnAc.className = "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all text-slate-400 hover:text-slate-600";
        contentSys.classList.remove('hidden');
        contentAc.classList.add('hidden');
    }
}


function switchModalTab(tab) {
    const btnAc = document.getElementById('modal-tab-academic');
    const btnSys = document.getElementById('modal-tab-system');
    const contentAc = document.getElementById('modal-content-academic');
    const contentSys = document.getElementById('modal-content-system');

    if (tab === 'academic') {

        btnAc.className = "flex-1 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all bg-white text-rose-500 shadow-sm flex items-center justify-center gap-2";
        btnSys.className = "flex-1 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all text-slate-400 hover:text-slate-600 flex items-center justify-center gap-2";


        contentAc.classList.remove('hidden');
        contentSys.classList.add('hidden');
    } else {

        btnSys.className = "flex-1 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all bg-white text-blue-500 shadow-sm flex items-center justify-center gap-2";
        btnAc.className = "flex-1 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all text-slate-400 hover:text-slate-600 flex items-center justify-center gap-2";


        contentSys.classList.remove('hidden');
        contentAc.classList.add('hidden');
    }
}

function openUpdatesModal() {
    const modal = document.getElementById('update-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const content = document.getElementById('modal-content');
    if (!modal) return;


    switchModalTab('academic');

    modal.classList.remove('hidden');
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        content.classList.remove('opacity-0', 'scale-95');
        content.classList.add('scale-100');
    }, 10);
}

function closeUpdatesModal() {
    const modal = document.getElementById('update-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const content = document.getElementById('modal-content');
    if (!modal) return;

    backdrop.classList.add('opacity-0');
    content.classList.remove('scale-100');
    content.classList.add('opacity-0', 'scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}


document.addEventListener('DOMContentLoaded', () => {
    renderUpdatesWidget();
    renderUpdatesModal();

    if (window.updatePageContent) window.updatePageContent();
});
