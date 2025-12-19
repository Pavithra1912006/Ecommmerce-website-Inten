import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Nav = styled.nav`
  background: linear-gradient(135deg, #8B6F47 0%, #A0826D 50%, #8B6F47 100%);
  box-shadow: 0 4px 20px rgba(139, 111, 71, 0.4);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  animation: slideDown 0.5s ease;
  
  @keyframes slideDown {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  margin-right: 0.5rem;
`;

const LogoText = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #FFF8DC;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  letter-spacing: 2px;
`;

const NavLinks = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen'
})`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #8B6F47;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    gap: 1rem;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavContainer = styled.div`
  position: relative;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #FFF8DC;
  font-weight: bold;
  transition: all 0.3s ease;
  &:hover { 
    color: #ffd700;
    transform: translateY(-2px);
  }
`;

const CartBadge = styled.span`
  background: linear-gradient(135deg, #FF6347 0%, #FF4500 100%);
  color: #FFF8DC;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  box-shadow: 0 2px 8px rgba(255, 69, 0, 0.5);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'primary'
})`
  background: ${props => props.primary ? '#8B6F47' : 'transparent'};
  color: #FFF8DC;
  border: 2px solid #FFF8DC;
  padding: 0.7rem 1.8rem;
  border-radius: 25px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: ${props => props.primary ? '0 4px 15px rgba(139, 111, 71, 0.4)' : 'none'};
  &:hover { 
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(139, 111, 71, 0.6);
    background: ${props => props.primary ? '#6d5636' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const WelcomeText = styled.span`
  color: #ffd700;
  font-weight: bold;
  font-size: 0.95rem;
  background: rgba(255, 215, 0, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  border: 1px solid #ffd700;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
`;

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <LogoImage src="/src/assets/logo.png" alt="Trendy Tints Logo" />
          <LogoText>Trendy Tints</LogoText>
        </Logo>
        <MobileNavContainer>
          <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </HamburgerButton>
          <NavLinks isOpen={isMenuOpen}>
            {user?.isAdmin ? (
              <>
                <NavLink to="/admin" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</NavLink>
                <WelcomeText>Welcome, {user.name}</WelcomeText>
                <Button onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</Button>
              </>
            ) : (
              <>
                {!isAuthenticated && <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>}
                {isAuthenticated ? (
                  <>
                    <NavLink to="/categories" onClick={() => setIsMenuOpen(false)}>Categories</NavLink>
                    <NavLink to="/products" onClick={() => setIsMenuOpen(false)}>Shop All</NavLink>
                    <NavLink to="/wishlist" onClick={() => setIsMenuOpen(false)}>
                      Wishlist {getWishlistCount() > 0 && <CartBadge>{getWishlistCount()}</CartBadge>}
                    </NavLink>
                    <NavLink to="/cart" onClick={() => setIsMenuOpen(false)}>
                      Cart {getCartCount() > 0 && <CartBadge>{getCartCount()}</CartBadge>}
                    </NavLink>
                    <NavLink to="/orders" onClick={() => setIsMenuOpen(false)}>Orders</NavLink>
                    <WelcomeText>Welcome, {user?.name}</WelcomeText>
                    <Button onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</Button>
                  </>
                ) : (
                  <>
                    <NavLink to="/features" onClick={() => setIsMenuOpen(false)}>Features</NavLink>
                    <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
                    <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
                    <Button as={Link} to="/signup" primary onClick={() => setIsMenuOpen(false)}>Sign Up</Button>
                  </>
                )}
              </>
            )}
          </NavLinks>
        </MobileNavContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;