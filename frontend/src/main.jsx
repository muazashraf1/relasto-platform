import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { PropertyProvider } from './context/PropertyContext.jsx'
import { VisitProvider } from './context/VisitContext.jsx'
import { AgentProvider } from './context/AgentContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <PropertyProvider>
        <VisitProvider>
          <AgentProvider>
            <StrictMode>
              <App />
            </StrictMode>
          </AgentProvider>
        </VisitProvider>
      </PropertyProvider>
    </AuthProvider>
  </BrowserRouter>
)