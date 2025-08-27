import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import App from './App.jsx'
import { CartProvider} from './context/CartContext.jsx'
import { OrderProvider } from './context/ordercontext.jsx'
import Wishlist from './pages/Wishlist.jsx'
import { WishlistProvider } from './context/wishlistcontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>
    
  </StrictMode>
)
