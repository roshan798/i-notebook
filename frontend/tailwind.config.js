/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                    700: '#7e22ce',
                    800: '#6b21a8',
                    900: '#581c87',
                    950: '#3b0764',
                },
            },
            keyframes: {
                widening: {
                    '0%': {
                        width: '0%',
                    },
                    50: {
                        width: '65%',
                    },
                    '100%': {
                        width: '100%',
                    },
                },
                'horizontal-bounce': {
                    '0%,100%': {
                        transform: ' translateX(0)',
                    },
                    '50%': {
                        transform: 'translateX(5px)',
                    },
                },
            },
            animation: {
                widening: 'widening 3s ease forwards',
                'horizontal-bounce': 'horizontal-bounce 1s infinite',
            },
        },
        fontFamily: {
            body: [
                'Roboto',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'system-ui',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'Noto Sans',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji',
            ],
            sans: [
                'Roboto',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'system-ui',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'Noto Sans',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji',
            ],
        },
    },
    plugins: [],
}
