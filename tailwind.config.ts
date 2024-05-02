import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'svg-pattern': 'url(/img/svg-pattern.svg)',
				'svg-robot': 'url(/img/robot-svg-bg.svg)',
			},
		},
	},
	plugins: [],
};
export default config;
