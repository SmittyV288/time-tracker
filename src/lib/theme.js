import { writable } from 'svelte/store';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
export const darkMode = writable(prefersDark);

darkMode.subscribe((isDark) => {
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});
