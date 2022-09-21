/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#FF868E",
				"primary-soft": "#FBE0DC",
				"primary-dark": "#543C3D",
				success: "#97EAB9",
				warning: "#FFD280",
				purple: "#B4B7FF",
				gray: "#E5E5E5",
				"gray-dark": "#8C8C8C",
				dark: "#1D1D1D",
				"dark-soft": "#292929",
			},
		},
	},
	darkMode: "class",
	plugins: [require("tailwindcss-global-dark")],
};
