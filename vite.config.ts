import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Mapeia '@' para o diretório 'src'
      // Ensure consistency with tsconfig.json if using specific aliases
    },
  },
  server: {
    allowedHosts: [
      'josedanilo.com.br'
    ]
  },
})

