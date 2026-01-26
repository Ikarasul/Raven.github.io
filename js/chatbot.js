

(function () {


    const style = document.createElement('style');
    style.innerHTML = `

        .chat-widget {
            position: fixed;
            bottom: 1.5rem;
            right: 1.5rem;
            z-index: 99999;
            font-family: var(--font-main, 'Inter', sans-serif);
        }

        .chat-toggle {
            width: 3.5rem;
            height: 3.5rem;
            background: linear-gradient(135deg, var(--primary, #3b82f6) 0%, var(--success, #10b981) 100%);
            border-radius: 50%;
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 3px solid white;
        }

        .chat-toggle:hover {
            transform: scale(1.1) rotate(-5deg);
            box-shadow: 0 15px 40px rgba(59, 130, 246, 0.5);
        }
        

        @media (max-width: 900px) {
            .chat-widget {
                bottom: calc(60px + 1rem) !important;
            }
            .chat-window {
                bottom: calc(60px + 1.5rem) !important;
                max-height: calc(100vh - 60px - 10rem) !important;
            }
        }

        .chat-window {
            position: fixed;
            bottom: 6rem;
            right: 1.5rem;
            width: 360px;
            max-width: calc(100vw - 2rem);
            height: 550px;
            max-height: calc(100vh - 8rem);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid var(--border, #e2e8f0);
            border-radius: 24px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            transform-origin: bottom right;
            transform: scale(0);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 99999;
            overflow: hidden;
        }

        .chat-window.open {
            transform: scale(1);
            opacity: 1;
            pointer-events: all;
        }

        .chat-header {
            padding: 1.25rem;
            background: linear-gradient(135deg, var(--bg-surface-hover, #f1f5f9) 0%, white 100%);
            border-bottom: 1px solid var(--border, #e2e8f0);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .chat-messages {
            flex: 1;
            padding: 1rem;
            overflow-y: auto;
            scroll-behavior: smooth;
            background: var(--bg-body, #f8fafc);
        }

        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

        .message {
            margin-bottom: 1rem;
            display: flex;
            gap: 0.75rem;
            animation: fadeIn 0.3s ease-out;
        }

        .message.user { flex-direction: row-reverse; }

        .avatar {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
            font-weight: 700;
            flex-shrink: 0;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .avatar.bot { 
            background: url('whitebird-avatar.png') center/cover no-repeat;
            color: transparent; 
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }
        .avatar.user { 
            background: linear-gradient(135deg, var(--success, #10b981), #059669); 
            color: white; 
        }

        .bubble {
            padding: 0.75rem 1rem;
            border-radius: 1rem;
            font-size: 0.875rem;
            line-height: 1.5;
            max-width: 80%;
            word-wrap: break-word;
        }

        .message.bot .bubble {
            background: white;
            color: var(--text-main, #334155);
            border: 1px solid var(--border, #e2e8f0);
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            border-top-left-radius: 0.25rem;
        }

        .message.user .bubble {
            background: var(--primary, #3b82f6);
            color: white;
            border-top-right-radius: 0.25rem;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
        }

        .chat-input-area {
            padding: 1rem;
            border-top: 1px solid var(--border, #e2e8f0);
            background: white;
        }

        .chat-form { display: flex; gap: 0.5rem; }

        .chat-input {
            flex: 1;
            background: var(--bg-body, #f8fafc);
            border: 1px solid var(--border, #e2e8f0);
            border-radius: 2rem;
            padding: 0.75rem 1.25rem;
            color: var(--text-main, #334155);
            font-size: 0.875rem;
            outline: none;
            transition: all 0.2s;
        }

        .chat-input:focus {
            background: white;
            border-color: var(--primary, #3b82f6);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .btn-send {
            width: 2.75rem;
            height: 2.75rem;
            border-radius: 50%;
            background: var(--primary, #3b82f6);
            color: white;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
        }

        .btn-send:hover {
            transform: scale(1.1);
            background: var(--primary-hover, #2563eb);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .typing-dots { display: flex; gap: 4px; padding: 4px 8px; }
        .dot {
            width: 6px; height: 6px;
            background: var(--text-light, #94a3b8);
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out both;
        }
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);



    const container = document.createElement('div');
    container.className = 'chat-widget';
    container.innerHTML = `
        <div id="chat-window" class="chat-window">
            <div class="chat-header">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 2.5rem; height: 2.5rem; border-radius: 50%; overflow: hidden; border: 2px solid white; box-shadow: 0 4px 12px rgba(59,130,246, 0.2);">
                        <img src="whitebird-avatar.png" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div>
                        <h4 style="font-weight: 700; color: var(--text-main); font-size: 0.95rem; line-height: 1.2;">Whitebird (AI)</h4>
                        <p style="font-size: 0.7rem; color: var(--success); display: flex; align-items: center; gap: 4px; font-weight: 600;">
                            <span style="width: 6px; height: 6px; background: var(--success); border-radius: 50%;"></span> Online
                        </p>
                    </div>
                </div>
                <div style="display:flex; gap: 8px;">
                     <button id="chat-min" style="background:none; border:none; cursor:pointer; color: var(--text-light); transition:color 0.2s;" title="Minimize">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" x2="19" y1="12" y2="12"/></svg>
                     </button>
                </div>
            </div>
            
            <div id="chat-messages" class="chat-messages">
                <div class="message bot">
                    <div class="avatar bot">WB</div>
                    <div class="bubble">
                        สวัสดีค่ะ! หนูชื่อ <b>ไวท์เบิร์ด (Whitebird)</b> ค่ะ 👋<br>
                        มีอะไรให้ช่วยไหมคะ? <br><br>
                        ✅ <b>ถามการบ้าน / ตรวจสอบการเงิน</b> <br>
                        ✅ <b>ปรึกษาเรื่องเรียน / คำนวณเลข</b> <br>
                        💬 <b>พูดคุยทั่วไป</b> (หนูพร้อมช่วยเสมอค่ะ!)
                    </div>
                </div>
            </div>

            <div class="chat-input-area">
                <form id="chat-form" class="chat-form">
                    <input type="text" id="chat-input" class="chat-input" placeholder="พิมพ์อะไรสักอย่าง... (เช่น 'มีการบ้านค้างไหม')" autocomplete="off">
                    <button type="submit" class="btn-send">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </button>
                </form>
            </div>
        </div>

        <button id="chat-toggle" class="chat-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
        </button>
    `;
    document.body.appendChild(container);


    const toggle = document.getElementById('chat-toggle');
    const minBtn = document.getElementById('chat-min');
    const windowEl = document.getElementById('chat-window');
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');



    const GEMINI_API_KEY = 'AIzaSyCgB4CGqJSHdLJP0mBleXDRu0RyUDC9J1g';
    const SYSTEM_PROMPT = `You are "Whitebird" (ไวท์เบิร์ด), a smart virtual assistant for the "Raven Portfolio" website. Persona: Female, Friendly, Efficient, Concise. Use "ค่ะ/หนู" appropriately. Skills: Check homework (P2), Check finance (P3), General assistance.`;


    const RATE_LIMIT = 15;
    const THROTTLE_MS = 1000;
    let requestCount = 0;
    let lastRequestTime = 0;
    let rateLimitResetTime = Date.now() + 60000;

    function checkRateLimit() {
        const now = Date.now();
        if (now > rateLimitResetTime) { requestCount = 0; rateLimitResetTime = now + 60000; }
        if (requestCount >= RATE_LIMIT) return { allowed: false, message: `ใจเย็นๆ ค่ะ ถามรัวเกินไปแล้ว 😅` };
        const timeSince = now - lastRequestTime;
        if (timeSince < THROTTLE_MS && lastRequestTime > 0) return { allowed: false, message: `รอสักครู่นะคะ...` };
        return { allowed: true };
    }

    function recordRequest() {
        requestCount++;
        lastRequestTime = Date.now();
        const stats = JSON.parse(localStorage.getItem('chatbotUsage') || '{"total":0,"today":0,"lastDate":""}');
        stats.total++;
        localStorage.setItem('chatbotUsage', JSON.stringify(stats));
    }


    function toggleChat() {
        const isOpen = windowEl.classList.contains('open');
        if (isOpen) { windowEl.classList.remove('open'); }
        else { windowEl.classList.add('open'); setTimeout(() => input.focus(), 300); }
    }

    toggle.addEventListener('click', toggleChat);
    minBtn.addEventListener('click', toggleChat);


    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        const limit = checkRateLimit();
        if (!limit.allowed) { addMessage(limit.message, 'bot'); return; }

        recordRequest();
        addMessage(text, 'user');
        input.value = '';

        const typingId = showTyping();

        try {

            const localResponse = checkLocalData(text);
            if (localResponse) {
                setTimeout(() => { removeTyping(typingId); addMessage(localResponse, 'bot'); }, 400);
                return;
            }


            const weatherResponse = await checkWeather(text);
            if (weatherResponse) {
                removeTyping(typingId);
                addMessage(weatherResponse, 'bot');
                return;
            }


            const aiResponse = await callGeminiAPI(text);
            removeTyping(typingId);
            addMessage(aiResponse, 'bot');

        } catch (err) {
            console.error(err);
            removeTyping(typingId);
            addMessage("ระบบขัดข้องเล็กน้อย ลองใหม่อีกครั้งนะคะ", 'bot');
        }
    });





    async function checkWeather(text) {
        const t = text.toLowerCase();

        if (!t.includes('อากาศ') && !t.includes('weather') && !t.includes('ร้อนไหม') && !t.includes('ฝนตก')) return null;

        try {

            let lat = 13.7563, lon = 100.5018, city = "กรุงเทพฯ";
            try {
                const locRes = await fetch('https://ipapi.co/json/');
                if (locRes.ok) {
                    const data = await locRes.json();
                    lat = data.latitude; lon = data.longitude; city = data.city;


                    const cityLower = city.toLowerCase();
                    if (cityLower.includes('hat yai') || cityLower.includes('hatyai')) city = 'สงขลา';
                    if (cityLower === 'bangkok') city = 'กรุงเทพฯ';

                } else {
                    throw new Error("IPAPI failed");
                }
            } catch (e) {

                try {
                    const locRes2 = await fetch('https://get.geojs.io/v1/ip/geo.json');
                    const data2 = await locRes2.json();
                    lat = data2.latitude; lon = data2.longitude; city = data2.city;
                    const cityLower = city.toLowerCase();
                    if (cityLower.includes('hat yai') || cityLower.includes('hatyai')) city = 'สงขลา';
                    if (cityLower === 'bangkok') city = 'กรุงเทพฯ';
                } catch (e2) { console.warn("Loc failed, using default BKK"); }
            }


            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&timezone=auto`;
            const wRes = await fetch(url);
            const wData = await wRes.json();
            const curr = wData.current;


            const temp = Math.round(curr.temperature_2m);
            const code = curr.weathercode;
            let condition = "มีเมฆมาก";
            let icon = "☁️";


            if (code === 0) { condition = "ฟ้าโปร่งแจ่มใส"; icon = "☀️"; }
            else if (code <= 3) { condition = "มีเมฆบางส่วน"; icon = "⛅"; }
            else if (code <= 48) { condition = "หมอกลง"; icon = "🌫️"; }
            else if (code <= 67) { condition = "มีฝนตก"; icon = "🌧️"; }
            else if (code <= 82) { condition = "ฝนตกหนัก"; icon = "⛈️"; }
            else if (code >= 95) { condition = "พายุฝนฟ้าคะนอง"; icon = "⚡"; }

            return `ตอนนี้ที่ <b>${city}</b> อุณหภูมิ <b>${temp}°C</b><br>${condition} ค่ะ ${icon}`;

        } catch (err) {
            console.error("Weather Error", err);
            return "ขออภัยค่ะ เช็คสภาพอากาศไม่ได้ในขณะนี้ 😓";
        }
    }

    function addMessage(text, sender) {
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        const avatarHTML = sender === 'bot'
            ? `<div class="avatar bot" style="background:none; border:none; padding:0; overflow:hidden;"><img src="whitebird-avatar.png" style="width:100%; height:100%; object-fit:cover;"></div>`
            : `<div class="avatar user"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`;

        div.innerHTML = sender === 'bot'
            ? avatarHTML + `<div class="bubble">${formattedText}</div>`
            : `<div class="bubble">${formattedText}</div>` + avatarHTML;

        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function showTyping() {
        const id = 'typing-' + Date.now();
        const div = document.createElement('div');
        div.className = 'message bot';
        div.id = id;
        div.innerHTML = `<div class="avatar bot">WB</div><div class="bubble"><div class="typing-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>`;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
        return id;
    }
    function removeTyping(id) { const el = document.getElementById(id); if (el) el.remove(); }



    const SCHEDULE_DATA = [
        { day: 'Monday', classes: [{ name: 'ICT12367 (2:004)', desc: '13:00-14:40' }] },
        { day: 'Tuesday', classes: [{ name: 'ICT25367 (1:001)', desc: '09:00-11:30' }] },
        { day: 'Wednesday', classes: [{ name: 'ICT25267 (1:002)', desc: '09:00-11:30' }, { name: 'ICT12367 (1:003)', desc: '13:00-14:40' }] },
        { day: 'Thursday', classes: [{ name: 'ICT22667 (2:001)', desc: '09:00-10:40' }, { name: 'ICT22667 (1:001)', desc: '11:00-12:40' }, { name: 'ICT24267 (2:001)', desc: '13:00-14:40' }, { name: 'ICT24267 (1:001)', desc: '15:00-16:40' }] },
        { day: 'Friday', classes: [] }, { day: 'Saturday', classes: [] }, { day: 'Sunday', classes: [] }
    ];


    function checkLocalData(text) {
        const t = text.trim();
        const user = localStorage.getItem('raven_user');


        if (t.startsWith('ฝากจด') || t.startsWith('จดโน้ต') || t.toLowerCase().startsWith('note ')) {
            const content = t.replace(/^(ฝากจด|จดโน้ต|note )/i, '').trim();
            if (!content) return "ให้จดว่าอะไรดีคะ? (พิมพ์ 'ฝากจด [ข้อความ]')";


            let notes = localStorage.getItem('raven_notes') || '';
            notes += (notes ? '\n' : '') + `• ${content}`;
            localStorage.setItem('raven_notes', notes);


            const v2 = JSON.parse(localStorage.getItem('raven_notes_v2') || '{}');
            v2['general'] = notes;
            localStorage.setItem('raven_notes_v2', JSON.stringify(v2));

            return `จดบันทึกให้แล้วค่ะ: "${content}" 📝`;
        }


        if (t.startsWith('ฝากงาน') || t.startsWith('การบ้าน') || t.toLowerCase().startsWith('task ')) {
            if (!user) return "ต้องล็อกอินก่อนนะคะ ถึงจะฝากงานได้ 🔒";

            const taskName = t.replace(/^(ฝากงาน|การบ้าน|task )/i, '').trim();
            if (!taskName) return "งานอะไรเหรอคะ? (พิมพ์ 'ฝากงาน [ชื่องาน]')";


            const tasks = JSON.parse(localStorage.getItem('raven_assignments') || '[]');
            tasks.unshift({
                id: 'chat_' + Date.now(),
                courseId: 'GEN',
                title: taskName,
                done: false,
                file: null
            });
            localStorage.setItem('raven_assignments', JSON.stringify(tasks));

            return `เพิ่มงาน "${taskName}" ลงในรายการแล้วค่ะ สู้ๆ นะคะ! ✌️`;
        }


        const incomeMatch = t.match(/^(จดรายรับ|รายรับ|income)\s+(\d+)/i);
        const expenseMatch = t.match(/^(จดรายจ่าย|รายจ่าย|expense|ซื้อ.*)\s+(\d+)/i);

        if (incomeMatch || expenseMatch) {
            if (!user) return "ต้องล็อกอินก่อนนะคะ ถึงจะบันทึกการเงินได้ 🔒";

            const isIncome = !!incomeMatch;
            const rawAmount = parseInt((isIncome ? incomeMatch[2] : expenseMatch[2]), 10);
            const amount = isIncome ? rawAmount : -rawAmount;
            const desc = isIncome ? 'Income (Chat)' : (expenseMatch[1].replace('จดรายจ่าย', '').trim() || 'Expense (Chat)');

            const tx = JSON.parse(localStorage.getItem('raven_finance') || '[]');
            tx.push({
                id: 'ftx_' + Date.now(),
                desc: desc,
                text: desc,
                amount: amount,
                type: isIncome ? 'income' : 'expense',
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
            });
            localStorage.setItem('raven_finance', JSON.stringify(tx));


            window.dispatchEvent(new Event('raven-finance-update'));

            return `บันทึก${isIncome ? 'รายรับ' : 'รายจ่าย'} ${Math.abs(amount)} บาท เรียบร้อยค่ะ 💰`;
        }


        if (t.includes('เงินเหลือ') || t.includes('ยอดเงิน') || t.includes('balance') || t.includes('เหลือเงิน')) {
            if (!user) return "ต้องล็อกอินก่อนนะคะ 🔒";
            const tx = JSON.parse(localStorage.getItem('raven_finance') || '[]');
            const balance = tx.reduce((acc, x) => x.type === 'income' ? acc + parseFloat(x.amount) : acc - parseFloat(x.amount), 0);
            return `ยอดเงินคงเหลือตอนนี้: <b>${balance.toLocaleString()} บาท</b> ค่ะ 💸`;
        }


        if (t.includes('เรียนไร') || t.includes('เรียนอะไร') || t.includes('ตารางเรียน') || t.includes('กี่โมง')) {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const today = days[new Date().getDay()];
            const dayData = SCHEDULE_DATA.find(d => d.day === today);

            if (!dayData || dayData.classes.length === 0) return `วันนี้ (${today}) ไม่มีเรียนค่ะ พักผ่อนได้เลย! 🎉`;

            const classList = dayData.classes.map(c => `• <b>${c.name.split(' ')[0]}</b> (${c.desc})`).join('<br>');
            return `วันนี้มีเรียนตามนี้ค่ะ:<br>${classList}`;
        }

        return null;
    }



    async function callGeminiAPI(userPrompt) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
        const payload = { contents: [{ parts: [{ text: SYSTEM_PROMPT + "\n\nUser: " + userPrompt }] }] };
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

})();
