import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you deploy to GitHub Pages at https://USERNAME.github.io/REPO_NAME/,
// set base to '/REPO_NAME/'. For Vercel, Netlify, or a custom domain,
// leave it as '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
