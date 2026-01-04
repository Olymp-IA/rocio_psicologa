/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0f172a', // Slate-900
                    light: '#334155',   // Slate-700
                },
                secondary: {
                    DEFAULT: '#fff1f2', // Rose-50
                    dark: '#ffe4e6',    // Rose-100
                },
                accent: {
                    DEFAULT: '#0d9488', // Teal-600
                    light: '#2dd4bf',   // Teal-400
                },
                text: {
                    primary: '#1e293b', // Slate-800
                    secondary: '#64748b', // Slate-500
                    light: '#94a3b8',   // Slate-400
                }
            },
            fontFamily: {
                heading: ['var(--font-heading)', 'serif'],
                body: ['var(--font-body)', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '2rem',
                screens: {
                    '2xl': '1400px',
                },
            },
        },
    },
    plugins: [],
};
