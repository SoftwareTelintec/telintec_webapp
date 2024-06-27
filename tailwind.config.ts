import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans],
			},
			backgroundImage: {
				'svg-pattern': 'url(/img/svg-pattern.svg)',
				'svg-robot': 'url(/img/robot-svg-bg.svg)',
			},
			backgroundPosition: {
				'bottom-right': 'bottom right',
				'bottom-center': 'bottom center',
			},
			animation: {
				'robot-move': 'robot-move 5s infinite linear',
			},
			keyframes: {
				'robot-move': {
					'0%': { transform: 'translateX(0)' },
					'50%': { transform: 'translateX(10px)' },
					'100%': { transform: 'translateX(0)' },
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
