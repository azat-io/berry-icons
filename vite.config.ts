import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      fileName: 'index',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: (id: string) => !id.startsWith('.') && !path.isAbsolute(id),
    },
  },
})
