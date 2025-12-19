import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Title,
  CartContainer,
  CartItems,
  CartItem,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemBrand,
  ItemPrice,
  QuantityControls,
  QuantityButton,
  Quantity,
  RemoveButton,
  CartSummary,
  SummaryTitle,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  CheckoutButton,
  EmptyCart,
  EmptyCartTitle,
  ShopButton
} from './Cart.styles';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const calculateItemPrice = (item) => {
    return item.discount > 0 
      ? item.price * (1 - item.discount / 100)
      : item.price;
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <Container>
        <EmptyCart>
          <EmptyCartTitle>Your cart is empty</EmptyCartTitle>
          <p>Add some products to get started!</p>
          <ShopButton onClick={() => navigate('/')}>
            Continue Shopping
          </ShopButton>
        </EmptyCart>
      </Container>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <Container>
      <Title>Shopping Cart</Title>
      
      <CartContainer>
        <CartItems>
          {items.map(item => (
            <CartItem key={item._id}>
              <ItemImage
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80?text=Product';
                }}
              />
              
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemBrand>{item.brand}</ItemBrand>
                <ItemPrice>₹{calculateItemPrice(item).toFixed(0)}</ItemPrice>
              </ItemInfo>
              
              <QuantityControls>
                <QuantityButton
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                >
                  -
                </QuantityButton>
                <Quantity>{item.quantity}</Quantity>
                <QuantityButton
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </QuantityButton>
              </QuantityControls>
              
              <RemoveButton onClick={() => removeFromCart(item._id)}>
                Remove
              </RemoveButton>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          <SummaryRow>
            <SummaryLabel>Subtotal</SummaryLabel>
            <SummaryValue>₹{subtotal.toFixed(0)}</SummaryValue>
          </SummaryRow>
          
          <SummaryRow>
            <SummaryLabel>Shipping</SummaryLabel>
            <SummaryValue>
              {shipping === 0 ? 'FREE' : `₹${shipping}`}
            </SummaryValue>
          </SummaryRow>
          
          <SummaryRow total>
            <SummaryLabel total>Total</SummaryLabel>
            <SummaryValue total>₹{total.toFixed(0)}</SummaryValue>
          </SummaryRow>
          
          <CheckoutButton onClick={handleCheckout}>
            Proceed to Checkout
          </CheckoutButton>
        </CartSummary>
      </CartContainer>
    </Container>
  );
};

export default Cart;