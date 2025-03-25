/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 19/02/2025 - 21:09:15
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 19/02/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    watch: {
      usePolling: true,
    },
  },
  optimizeDeps: {
    include: ['simplebar'],
  },
});
