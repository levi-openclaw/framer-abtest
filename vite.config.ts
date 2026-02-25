import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import framer from 'vite-plugin-framer'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [mkcert(), react(), framer()],
  build: { target: 'esnext' }
})