import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App'
import { ThemeProvider } from '@/shared/utils/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <div className="flex min-h-screen w-full bg-bg text-text transition-colors duration-300">
        <App />
      </div>
    </ThemeProvider>
  </StrictMode>,
)
