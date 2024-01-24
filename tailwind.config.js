/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			keyframes: {
				fromStartToEnd: {
					'0%': { right: '100%' },
					'100%': { right: '-40%' }
				}
			},
			fontFamily: {
				supreme: 'Supreme-Variable',
				nunito: 'Nunito-Variable'
			}
		}
	},
	plugins: [require('tailwind-scrollbar')({ nocompatible: true })]
};
