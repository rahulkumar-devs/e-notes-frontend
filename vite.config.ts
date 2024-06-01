import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  const config = {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis', // Use globalThis for defining the global object
        },
      },
    },
  } as any;

  if (isProduction) {
    config.build = {
      outDir: 'dist', // Change outDir to dist for production build
      sourcemap: false, // Disable sourcemaps in production
    };
  } else {
    // Add any development-specific configurations here
    config.build = {
      sourcemap: true, // Enable sourcemaps in development
    };
  }

  return config;
});
