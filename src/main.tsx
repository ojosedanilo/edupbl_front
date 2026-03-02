import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/styles/index.css'
import { AppRoutes } from "@/routes";
import { ThemeProvider } from '@/shared/utils/ThemeContext'
import { BrowserRouter } from "react-router-dom";

// Criar o client antes do createRoot:
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="flex min-h-screen w-full bg-bg text-text transition-colors duration-300">
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
