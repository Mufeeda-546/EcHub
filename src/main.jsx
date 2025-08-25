import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import App from './App.jsx'
import { CartProvider} from './context/CartContext.jsx'
import { OrderProvider } from './context/ordercontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
       
        <App />
      </OrderProvider>
      </CartProvider>
    </AuthProvider>
    
  </StrictMode>
)
