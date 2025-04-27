// packages/app/vite.config.ts
import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react(), wasm()],
    build: {
        outDir: 'dist',
        target: 'esnext',
        minify: false
    }
})