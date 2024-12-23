import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import AuthProvider from './context/AuthProvider'
import MainRoute from './routes/MainRoute'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MainRoute/>
    </AuthProvider>
  </StrictMode>,
)
