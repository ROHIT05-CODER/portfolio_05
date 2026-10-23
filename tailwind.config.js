/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        coal: '#0d0d0d',
        graphite: '#171717',
        steel: '#2a2a2a',
        smoke: '#4d4d4d',
        ash: '#9a9a9a',
        bone: '#f2f2f2',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Newsreader', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      fontSize: {
        mega: ['clamp(3.1rem, 10.5vw, 9.5rem)', { lineHeight: '0.9', letterSpacing: '-0.045em' }],
        huge: ['clamp(2.5rem, 7vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        big: ['clamp(1.9rem, 4vw, 3.25rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
