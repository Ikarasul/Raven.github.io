


const theme = {
    colors: {
        bgBody: '#f8fafc',
        bgSurface: '#ffffff',
        bgSurfaceHover: '#f1f5f9',


        primary: '#3b82f6',
        primaryLight: '#60a5fa',
        primarySoft: '#eff6ff',

        secondary: '#10b981',
        secondarySoft: '#ecfdf5',

        accent: '#f472b6',
        accentSoft: '#fdf2f8',

        textMain: '#334155',
        textSecondary: '#64748b',
        textLight: '#94a3b8',

        border: '#e2e8f0',

        success: '#34d399',
        warning: '#fbbf24',
        danger: '#fb7185',
    },
    shadows: {
        sm: '0 2px 8px rgba(148, 163, 184, 0.1)',
        md: '0 8px 24px rgba(148, 163, 184, 0.12)',
        lg: '0 16px 48px rgba(148, 163, 184, 0.15)',
        glow: '0 0 16px rgba(59, 130, 246, 0.3)',
    },
    radius: {
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        full: '9999px',
    }
};



const root = document.documentElement;
Object.entries(theme.colors).forEach(([key, val]) => {
    root.style.setProperty(`--${camelToKebab(key)}`, val);
});
Object.entries(theme.shadows).forEach(([key, val]) => {
    root.style.setProperty(`--shadow-${key}`, val);
});
Object.entries(theme.radius).forEach(([key, val]) => {
    root.style.setProperty(`--radius-${key}`, val);
});


function camelToKebab(str) {
    return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}



const style = document.createElement('style');
style.textContent = `
    body {
        background-color: var(--bg-body);
        color: var(--text-main);
        font-family: 'Inter', sans-serif;
        -webkit-font-smoothing: antialiased;
    }
    

    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; border: 2px solid var(--bg-body); }
    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }


    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
    }
    
    @keyframes gentleFadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-enter { animation: gentleFadeIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }


    .page-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1.5rem;
        padding-top: 6rem;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        cursor: pointer;
    }
    
    .btn:active { transform: scale(0.96); }

    .btn-primary {
        background: var(--primary);
        color: white;
        border-radius: var(--radius-md);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
    }
    .btn-primary:hover {
        background: var(--primary-light);
        box-shadow: 0 6px 16px rgba(59, 130, 246, 0.35);
        transform: translateY(-1px);
    }
`;
document.head.appendChild(style);
