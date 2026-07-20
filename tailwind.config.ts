import type { Config } from "tailwindcss";

export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
        // Nuxt 4 structure
        "./app/components/**/*.{js,vue,ts}",
        "./app/layouts/**/*.vue",
        "./app/pages/**/*.vue",
        "./app/app.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Anek Bangla', 'Baloo Da 2', 'Hind Siliguri', 'system-ui', 'sans-serif'],
                display: ['Anek Bangla', 'Baloo Da 2', 'Hind Siliguri', 'system-ui', 'sans-serif']
            }
        },
    },
    plugins: [],
} satisfies Config;
