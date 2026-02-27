import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import { AppRoutes } from "@/routes";
import { ThemeProvider } from '@/shared/utils/ThemeContext'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <div className="flex min-h-screen w-full bg-bg text-text transition-colors duration-300">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  </StrictMode>,
)
