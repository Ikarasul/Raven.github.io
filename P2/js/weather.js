async function initWeather() {
    console.log("Initializing Weather V2...");

    const els = {
        loc: document.getElementById('w-loc'),
        temp: document.getElementById('w-temp-val'),
        desc: document.getElementById('w-desc'),
        // New V18 Elements
        mainIcon: document.getElementById('w-main-icon'),
        card: document.getElementById('w-card'),
        windBox: document.getElementById('w-wind-box'),
        windVal: document.getElementById('w-wind-val')
    };

    if (!els.loc || !els.temp) return;

    try {
        // 1. Get Location
        let city, country_name, latitude, longitude;
        try {
            const locRes = await fetch('https://ipapi.co/json/');
            const data = await locRes.json();
            city = data.city; country_name = data.country_name;
            latitude = data.latitude; longitude = data.longitude;
        } catch (e) {
            const locRes = await fetch('https://get.geojs.io/v1/ip/geo.json');
            const data = await locRes.json();
            city = data.city; country_name = data.country;
            latitude = data.latitude; longitude = data.longitude;
        }

        // Translation logic for City
        const lang = localStorage.getItem('raven_lang') || 'th';
        const displayCity = (lang === 'th' && city === "Bangkok") ? "กรุงเทพมหานคร" : city;
        const displayCountry = (lang === 'th' && country_name === "Thailand") ? "ไทย" : country_name;

        els.loc.innerText = `${displayCity}, ${displayCountry}`;

        // 2. Get Weather (Added is_day, wind_speed_10m)
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weathercode,is_day,wind_speed_10m&timezone=auto`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();
        const current = weatherData.current;

        // Update Values
        els.temp.innerText = Math.round(current.temperature_2m);

        // Wind
        if (current.wind_speed_10m > 5) {
            if (els.windBox) els.windBox.classList.remove('hidden');
            if (els.windBox) els.windBox.style.display = 'flex';
            if (els.windVal) els.windVal.innerText = current.wind_speed_10m;
        }

        // Logic for Visuals
        const isDay = current.is_day === 1;
        const code = current.weathercode;

        // Helper to set visuals
        function setVisuals(iconName, textColorClass, cardBgClass = "") {
            // Icon
            if (els.mainIcon) {
                els.mainIcon.innerHTML = `<i data-lucide="${iconName}" width="64" height="64"></i>`;
                els.mainIcon.className = `w-16 h-16 ${textColorClass} transition-colors duration-500`;
            }
            // Card (Optional bg change)
            if (els.card && cardBgClass) {
                // Remove generic bg classes if we want to override, or just append
                // sticking to light theme for now to match V18, but maybe add subtle tint
            }
        }

        // Mapping
        // Codes: 0=Clear, 1-3=Cloudy, 45/48=Fog, 51-67=Rain/Drizzle, 71+=Snow, 80+=Showers, 95+=Thunder

        let descTH = "ไม่ระบุ";
        let descEN = "Unknown";

        if (code === 0) { // Clear
            if (isDay) {
                setVisuals("sun", "text-amber-500");
                descTH = "ท้องฟ้าแจ่มใส"; descEN = "Clear Sky";
            } else {
                setVisuals("moon", "text-indigo-400");
                descTH = "ท้องฟ้าโปร่ง"; descEN = "Clear Night";
            }
        } else if (code >= 1 && code <= 3) { // Cloudy
            if (isDay) {
                setVisuals("cloud-sun", "text-orange-400");
                descTH = "มีเมฆบางส่วน"; descEN = "Partly Cloudy";
            } else {
                setVisuals("cloud-moon", "text-slate-400");
                descTH = "มีเมฆมาก"; descEN = "Cloudy Night";
            }
        } else if (code >= 51 && code <= 67) { // Rain
            setVisuals("cloud-rain", "text-blue-500");
            descTH = "ฝนตก"; descEN = "Raining";
        } else if (code >= 80 && code <= 82) { // Showers
            setVisuals("cloud-drizzle", "text-cyan-500");
            descTH = "ฝนตกปรอยๆ"; descEN = "Showers";
        } else if (code >= 95) { // Thunder
            setVisuals("cloud-lightning", "text-purple-500");
            descTH = "พายุฝนฟ้าคะนอง"; descEN = "Thunderstorm";
        } else {
            setVisuals("cloud", "text-slate-400");
            descTH = "มีเมฆ"; descEN = "Cloudy";
        }

        // Wind override if very strong? (>20km/h)
        if (current.wind_speed_10m > 20) {
            descTH += " / ลมแรง";
            descEN += " / Windy";
        }

        els.desc.innerText = (lang === 'th') ? descTH : descEN;

        if (window.lucide) lucide.createIcons();

    } catch (err) {
        console.warn("Weather V2 Error:", err);
        if (els.loc) els.loc.innerText = "Unavailable";
    }
}

// Run on load
document.addEventListener('DOMContentLoaded', initWeather);

// Listen for language changes to re-translate city
document.addEventListener('languageChanged', initWeather);
