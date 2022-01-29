import { resolve } from "path";
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },
    server: {
        host: '127.0.0.1',
        port: 8080
    },
    build: {
        outDir: '../docs',
        emptyOutDir: true
    }
})

