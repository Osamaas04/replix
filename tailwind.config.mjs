/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		fontFamily: {
		  raleway: ["var(--font-raleway)", "sans-serif"],
		  lato: ["var(--font-lato)", "sans-serif"],
		},
		colors: {
		  background: "var(--background)",
		  foreground: "var(--foreground)",
		  primary: "#000000",
		  secondary: "#f3f3f3",
		  accent: "#000401",
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		keyframes: {
		  'border-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
		  },
		  marquee: {
			from: {
			  transform: "translateX(0)",
			},
			to: {
			  transform: "translateX(calc(-100% - var(--gap)))",
			},
		  },
		  "marquee-vertical": {
			from: {
			  transform: "translateY(0)",
			},
			to: {
			  transform: "translateY(calc(-100% - var(--gap)))",
			},
		  },
		},
		animation: {
		  'border-spin': 'border-spin 4s linear infinite',
		  marquee: "marquee var(--duration) infinite linear",
		  "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  