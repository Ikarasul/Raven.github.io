(function () {
    const applyTheme = () => {
        const style = document.createElement('style');
        style.id = 'raven-global-theme';
        style.innerHTML = `
            :root {
                /* Comfortable Modern Palette */
                --bg-body: #f8fafc;        /* Slate 50 - Soft Background */
                --bg-surface: #ffffff;     /* White - Cards/Containers */
                --bg-surface-hover: #f1f5f9; /* Slate 100 */
                
                --primary: #3b82f6;        /* Blue 500 */
                --primary-hover: #2563eb;  /* Blue 600 */
                --primary-light: #eff6ff;  /* Blue 50 */
                
                --text-main: #1e293b;      /* Slate 800 - Soft Black */
                --text-secondary: #64748b; /* Slate 500 - Muted */
                --text-light: #94a3b8;     /* Slate 400 */
                
                --border: #e2e8f0;         /* Slate 200 */
                --border-hover: #cbd5e1;   /* Slate 300 */
                
                --success: #10b981;        /* Emerald 500 */
                --warning: #f59e0b;        /* Amber 500 */
                --danger: #ef4444;         /* Red 500 */
                
                --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                
                --radius-sm: 0.5rem;
                --radius-md: 0.75rem;
                --radius-lg: 1rem;
                --radius-xl: 1.5rem;
                
                --font-main: 'Inter', system-ui, -apple-system, sans-serif;
            }

            body {
                background-color: var(--bg-body);
                color: var(--text-main);
                font-family: var(--font-main);
                margin: 0;
                line-height: 1.5;
                -webkit-font-smoothing: antialiased;
            }

            /* Global Utility Classes for Pages */
            .page-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 2rem 1.5rem;
            }

            .card {
                background: var(--bg-surface);
                border-radius: var(--radius-lg);
                border: 1px solid var(--border);
                box-shadow: var(--shadow-sm);
                transition: all 0.2s ease;
            }

            .card:hover {
                border-color: var(--border-hover);
                box-shadow: var(--shadow-md);
                transform: translateY(-2px);
            }

            .btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: var(--radius-md);
                font-weight: 500;
                transition: all 0.2s;
                cursor: pointer;
                gap: 0.5rem;
            }

            .btn-primary {
                background-color: var(--primary);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
            }

            .btn-primary:hover {
                background-color: var(--primary-hover);
            }

            /* Scrollbar Polish */
            ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            ::-webkit-scrollbar-track {
                background: transparent;
            }
            ::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: #94a3b8;
            }
        `;

        // Remove old theme styles if any
        const oldStyle = document.getElementById('raven-global-theme');
        if (oldStyle) oldStyle.remove();

        document.head.appendChild(style);

        // Log setup
        console.log("%c RavenPort Theme Applied: Comfortable Modern ", "background: #3b82f6; color: #ffffff; padding: 4px 8px; border-radius: 4px; font-weight: bold;");
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyTheme);
    } else {
        applyTheme();
    }
})();
