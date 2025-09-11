/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        heading: ["MontserratBold"],
        body: ["NunitoRegular"],
        tagline: ["PlayfairDisplay"],
        secondary: ["PoppinsRegular"]
      },
    },
  },
  plugins: [],
}

