/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      backgroundColor: {
        "thin-gray": "#F5F5F5",
        "dark-gray": "#DCDCDC"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

