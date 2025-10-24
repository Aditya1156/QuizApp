import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              // Split heavy 3D libraries
              'three': ['three'],
              'postprocessing': ['postprocessing'],
              // Split admin features
              'admin': [
                './screens/AdminDashboardScreen',
                './screens/AdminLoginScreen',
                './screens/AdminSignupScreen'
              ],
              // Split QR code features
              'qr': [
                './components/QRScanner',
                './screens/LobbyScreen'
              ],
              // Split 3D effects
              'effects': [
                './components/PixelBlast',
                './components/ShaderBackground'
              ]
            }
          }
        },
        chunkSizeWarningLimit: 1000
      }
    };
});
