// 🎄 Premium Christmas Effects - RavenPort

(function () {
    'use strict';

    const savedMode = localStorage.getItem('christmas_mode');
    const isChristmasMode = savedMode === null ? true : savedMode === 'true';

    function initChristmas() {
        createToggleButton();

        if (isChristmasMode) {
            enableChristmasMode(false); // Don't show toast on initial load
        }
    }

    function createToggleButton() {
        // Check if button already exists
        if (document.getElementById('christmas-toggle')) return;

        const button = document.createElement('button');
        button.id = 'christmas-toggle';
        button.innerHTML = isChristmasMode ? '🎄' : '🎅';
        button.title = isChristmasMode ? 'ปิดธีมคริสมาส' : 'เปิดธีมคริสมาส';
        button.onclick = toggleChristmasMode;

        // Fixed Position Styles (Bottom Right)
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 9999;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Hover Effect
        button.onmouseenter = () => {
            button.style.transform = 'scale(1.1) rotate(10deg)';
        };
        button.onmouseleave = () => {
            button.style.transform = 'scale(1) rotate(0deg)';
        };

        document.body.appendChild(button);
    }

    function toggleChristmasMode() {
        const currentMode = document.body.classList.contains('christmas-mode');

        if (currentMode) {
            disableChristmasMode();
        } else {
            enableChristmasMode(true); // Show toast ONLY on manual toggle
        }
    }

    function enableChristmasMode(showToast = false) {
        document.body.classList.add('christmas-mode');
        localStorage.setItem('christmas_mode', 'true');

        setTimeBasedBackground();

        const button = document.getElementById('christmas-toggle');
        if (button) {
            button.innerHTML = '🎄';
            button.title = 'ปิดธีมคริสมาส';
            button.style.background = '#f0fdf4'; // Light green bg
            button.style.borderColor = '#10b981';
        }

        createPremiumSnowfall();
        createChristmasLights();
        createStarParticles();
        createChristmasTree();
        createGiftBox();

        if (showToast) {
            showChristmasMessage();
        }
    }

    function setTimeBasedBackground() {
        const hour = new Date().getHours();
        let timeOfDay;

        if (hour >= 6 && hour < 12) {
            timeOfDay = 'morning';
        } else if (hour >= 12 && hour < 18) {
            timeOfDay = 'afternoon';
        } else {
            timeOfDay = 'evening';
        }

        document.body.setAttribute('data-time', timeOfDay);
    }

    function disableChristmasMode() {
        document.body.classList.remove('christmas-mode');
        document.body.removeAttribute('data-time');
        localStorage.setItem('christmas_mode', 'false');

        const button = document.getElementById('christmas-toggle');
        if (button) {
            button.innerHTML = '🎅';
            button.title = 'เปิดธีมคริสมาส';
            button.style.background = 'white';
            button.style.borderColor = '#e2e8f0';
        }

        removeChristmasElements();
    }

    // Pixel-style Snowfall
    function createPremiumSnowfall() {
        const snowflakeChars = ['■', '□', '▪', '▫', '·', '•'];
        const snowflakeCount = 60;

        for (let i = 0; i < snowflakeCount; i++) {
            setTimeout(() => {
                createSnowflake(snowflakeChars);
            }, i * 150);
        }

        setInterval(() => {
            if (document.body.classList.contains('christmas-mode')) {
                createSnowflake(snowflakeChars);
            }
        }, 800);
    }

    function createSnowflake(chars) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = chars[Math.floor(Math.random() * chars.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.fontSize = (Math.random() * 8 + 8) + 'px';
        snowflake.style.animationDuration = (Math.random() * 12 + 12) + 's';
        snowflake.style.opacity = Math.random() * 0.6 + 0.4;
        snowflake.style.animationDelay = Math.random() * 3 + 's';

        document.body.appendChild(snowflake);

        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.parentNode.removeChild(snowflake);
            }
        }, 25000);
    }

    // Star Particles
    function createStarParticles() {
        const starCount = 30;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star-particle';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 60 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (Math.random() * 2 + 2) + 's';

            document.body.appendChild(star);
        }
    }

    function createChristmasLights() {
        const lightsContainer = document.createElement('div');
        lightsContainer.className = 'christmas-lights';
        lightsContainer.id = 'christmas-lights-container';

        const colors = ['red', 'green', 'gold', 'blue'];
        const lightCount = window.innerWidth < 640 ? 18 : 30;

        for (let i = 0; i < lightCount; i++) {
            const light = document.createElement('div');
            light.className = `light ${colors[i % colors.length]}`;
            lightsContainer.appendChild(light);
        }

        document.body.appendChild(lightsContainer);
    }

    function createChristmasTree() {
        const tree = document.createElement('div');
        tree.className = 'christmas-tree';
        tree.id = 'christmas-tree';
        tree.innerHTML = '🎄';
        tree.title = 'Merry Christmas! 🎅';
        tree.onclick = () => {
            tree.style.animation = 'none';
            setTimeout(() => {
                tree.style.animation = 'sway 4s ease-in-out infinite';
            }, 10);
            showChristmasMessage('🎅 Ho Ho Ho! Merry Christmas! 🎄');
            createMagicSparkles(tree);
        };

        document.body.appendChild(tree);
    }

    function createGiftBox() {
        const gift = document.createElement('div');
        gift.className = 'gift-box';
        gift.id = 'gift-box';
        gift.innerHTML = '🎁';
        gift.title = 'Click for a surprise!';
        gift.onclick = () => {
            gift.innerHTML = '🎉';
            createConfetti();
            setTimeout(() => {
                gift.innerHTML = '🎁';
            }, 1500);
            showChristmasMessage('🎁 สุขสันต์วันคริสต์มาส! 🎊');
        };

        document.body.appendChild(gift);
    }

    function createMagicSparkles(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                font-size: 20px;
                pointer-events: none;
                z-index: 9999;
                animation: sparkleFloat ${1 + Math.random()}s ease-out forwards;
            `;
            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1500);
        }
    }

    function createConfetti() {
        const colors = ['🔴', '🟢', '🟡', '🔵', '🟣', '🟠'];
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.innerHTML = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.cssText = `
                position: fixed;
                left: ${window.innerWidth < 640 ? 50 : 70}px;
                bottom: ${window.innerWidth < 640 ? 140 : 160}px;
                font-size: 16px;
                pointer-events: none;
                z-index: 9999;
                animation: confettiFall ${2 + Math.random()}s ease-out forwards;
            `;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }
    }

    function removeChristmasElements() {
        document.querySelectorAll('.snowflake').forEach(el => el.remove());
        document.querySelectorAll('.star-particle').forEach(el => el.remove());

        const lights = document.getElementById('christmas-lights-container');
        if (lights) lights.remove();

        const tree = document.getElementById('christmas-tree');
        if (tree) tree.remove();

        const gift = document.getElementById('gift-box');
        if (gift) gift.remove();
    }

    function showChristmasMessage(customMessage) {
        const messages = [
            '🎄 สุขสันต์วันคริสต์มาส! 🎅',
            '✨ Merry Christmas! ❄️',
            '🎁 Happy Holidays! 🎊'
        ];
        const message = customMessage || messages[Math.floor(Math.random() * messages.length)];

        // Remove existing toast if any
        const existingToast = document.querySelector('.xmas-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'xmas-toast';
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: rgba(15, 23, 42, 0.85); /* Dark Glass */
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            color: white;
            padding: 3rem 4rem;
            border-radius: 32px;
            font-size: 2rem;
            font-weight: 800;
            text-align: center;
            z-index: 10000;
            box-shadow: 
                0 20px 60px rgba(0, 0, 0, 0.5),
                inset 0 0 0 1px rgba(255, 255, 255, 0.15),
                0 0 40px rgba(220, 38, 38, 0.3); /* Red Glow */
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 1px solid rgba(255,255,255,0.2);
            min-width: 320px;
        `;

        // Add decorative top border (Candy cane)
        const deco = document.createElement('div');
        deco.style.cssText = `
            position: absolute;
            top: 0; left: 0; right: 0; height: 6px;
            background: linear-gradient(90deg, #ff0000 25%, #ffffff 25%, #ffffff 50%, #00ff00 50%, #00ff00 75%, #ffffff 75%);
            background-size: 40px 100%;
            border-radius: 32px 32px 0 0;
            opacity: 0.8;
        `;
        toast.appendChild(deco);

        const text = document.createElement('div');
        text.innerHTML = message;
        text.style.textShadow = '0 2px 10px rgba(0,0,0,0.5)';
        toast.appendChild(text);

        document.body.appendChild(toast);

        // Animation In
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // Animation Out
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, -50%) scale(0.9) translateY(20px)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 500);
        }, 3000);
    }

    // Add necessary animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            0% {
                transform: translate(-50%, -50%) scale(0) rotate(-180deg);
                opacity: 0;
            }
            100% {
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
                opacity: 1;
            }
        }
        @keyframes popOut {
            0% {
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(0) rotate(180deg);
                opacity: 0;
            }
        }
        @keyframes sparkleFloat {
            0% {
                transform: translate(0, 0) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, ${-Math.random() * 100 - 50}px) scale(1.5);
                opacity: 0;
            }
        }
        @keyframes confettiFall {
            0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, -200px) rotate(${Math.random() * 720}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChristmas);
    } else {
        initChristmas();
    }

    // ✨ Magical Sparkle Cursor Trail
    function initCursorTrail() {
        const colors = ['#cf0000', '#00cf00', '#ffd700', '#ffffff'];
        let particles = [];

        document.addEventListener('mousemove', function (e) {
            if (!document.body.classList.contains('christmas-mode')) return;

            // Limit creation rate
            if (Math.random() > 0.3) return;

            createSparkle(e.clientX, e.clientY);
        });

        function createSparkle(x, y) {
            const sparkle = document.createElement('div');
            sparkle.className = 'cursor-sparkle';
            // Random offset
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;

            sparkle.style.left = (x + offsetX) + 'px';
            sparkle.style.top = (y + offsetY) + 'px';
            sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
            sparkle.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;

            document.body.appendChild(sparkle);

            // Animation via JS for simpler cleanup
            let opacity = 1;
            let top = y + offsetY;

            function animate() {
                opacity -= 0.05;
                top += 1; // Fall down slightly
                sparkle.style.opacity = opacity;
                sparkle.style.top = top + 'px';

                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    sparkle.remove();
                }
            }
            requestAnimationFrame(animate);
        }

        // Add CSS for sparkle
        const style = document.createElement('style');
        style.textContent = `
            .cursor-sparkle {
                position: fixed;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 4px white;
            }
            body.christmas-mode {
                cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(1px 1px 1px black);"><path d="M12 2l3 6 6 1-4 5 1 7-6-3-6 3 1-7-4-5 6-1 3-6z"/></svg>') 12 12, auto;
            }
        `;
        document.head.appendChild(style);
    }

    // Call init
    initCursorTrail();

})();
