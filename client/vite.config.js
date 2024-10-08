import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
server: {
  host: '127.0.0.1', // Bind to all network interfaces for local development; consider changing to '127.0.0.1' for production
  port: 3001,      // Custom port for development; change to the appropriate port for production
  proxy:{
    '/api': {
      target:'http://localhost:3000',
      secure: false
    },
  },
},
  plugins: [react()],
})
