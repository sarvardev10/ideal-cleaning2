import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@pages", replacement: "/src/pages/index.tsx" },
      { find: "@routes", replacement: "/src/router/routes.tsx" },
      { find: "@validation", replacement: "/src/utils/index.ts" },
      { find: "@service", replacement: "/src/service/index.ts" },
      { find: "@modal", replacement: "/src/components/modals/index.tsx" },
      { find: "@ui", replacement: "/src/components/ui/index.tsx" },
    ],
  },
})
