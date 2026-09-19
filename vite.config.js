import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative asset URLs keep the production bundle valid at the GitHub Pages
// repository path as well as at a root-domain deployment.
export default defineConfig({
  plugins: [react()],
  base: './',
})
