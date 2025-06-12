// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()], // Enable React plugin
//   server: {
//     port: 5174, // Match the port you're using
//     host: '0.0.0.0', // Allow access from network (optional, helps with local testing)
//     hmr: {
//       protocol: 'ws', // Explicitly use WebSocket
//       host: 'localhost',
//       port: 5174,
//       clientPort: 5174, // Ensure client connects to the same port
//     },
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: 'localhost',
  },
});