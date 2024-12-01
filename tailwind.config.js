/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  darkMode: 'class', // Enables dark mode with the "dark" class
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
      extend: {},
  },
  plugins: [
      require('@tailwindcss/forms'), // For better form styling
      require('@tailwindcss/typography'), // For text styling
  ],
};
