import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            src: '/src',
            '@': path.resolve('src'),
            '@components': path.resolve('src/components'),
            '@pages': path.resolve('src/pages'),
            '@img': path.resolve('src/assets/img')
        }
    }
});
