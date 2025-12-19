import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AlertProvider } from './context/AlertContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Orders from './pages/Orders/Orders';
import Features from './pages/Features/Features';
import Contact from './pages/Contact/Contact';
import AllCategories from './pages/AllCategories/AllCategories';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Wishlist from './pages/Wishlist/Wishlist';

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
          <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/categories" 
                element={
                  <ProtectedRoute>
                    <AllCategories />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/categories/:category" 
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                } 
              />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/orders" 
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/wishlist" 
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;