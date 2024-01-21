/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				supreme: 'Supreme-Variable',
				nunito: 'Nunito-Variable'
			}
		}
	},
	plugins: [require('tailwind-scrollbar')({ nocompatible: true })]
};
