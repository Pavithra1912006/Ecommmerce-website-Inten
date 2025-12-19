import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { orderAPI } from '../../services/api';
import {
  Container,
  Title,
  CheckoutContainer,
  Section,
  SectionTitle,
  Form,
  FormRow,
  FormGroup,
  Label,
  Input,
  OrderSummary,
  OrderItem,
  ItemInfo,
  ItemName,
  ItemQuantity,
  ItemPrice,
  TotalRow,
  PlaceOrderButton,
  SuccessMessage,
  SuccessTitle,
  OrderNumber,
  ContinueButton
} from './Checkout.styles';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [shippingInfo, setShippingInfo] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const calculateItemPrice = (item) => {
    return item.discount > 0 
      ? item.price * (1 - item.discount / 100)
      : item.price;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }
    
    setLoading(true);

    try {
      const orderData = {
        products: items.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: calculateItemPrice(item)
        })),
        total: getCartTotal() + (getCartTotal() > 500 ? 0 : 50),
        shippingAddress: shippingInfo,
        paymentMethod
      };

      const response = await orderAPI.create(orderData);
      setOrderId(response.data._id);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <Container>
        <SuccessMessage>
          <SuccessTitle>🎉 Order Placed Successfully!</SuccessTitle>
          <OrderNumber>Order ID: {orderId}</OrderNumber>
          <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
          <ContinueButton onClick={() => navigate('/')}>
            Continue Shopping
          </ContinueButton>
        </SuccessMessage>
      </Container>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <Container>
      <Title>Checkout</Title>
      
      <CheckoutContainer>
        <Section>
          <SectionTitle>Shipping Information</SectionTitle>
          <Form onSubmit={handlePlaceOrder}>
            <FormGroup>
              <Label>Street Address</Label>
              <Input
                type="text"
                name="street"
                value={shippingInfo.street}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormRow>
              <FormGroup>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>State</Label>
                <Input
                  type="text"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <Label>ZIP Code</Label>
              <Input
                type="text"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Form>
        </Section>

        <Section>
          <SectionTitle>Payment Method</SectionTitle>
          <Form>
            <FormGroup>
              <Label>
                <Input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ width: 'auto', marginRight: '10px' }}
                />
                Cash on Delivery (COD)
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <Input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ width: 'auto', marginRight: '10px' }}
                />
                Credit/Debit Card
              </Label>
            </FormGroup>
            
            {paymentMethod === 'card' && (
              <div style={{ marginLeft: '30px', marginTop: '15px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                <FormGroup>
                  <Label>Card Number</Label>
                  <Input type="text" placeholder="1234 5678 9012 3456" maxLength="19" required />
                </FormGroup>
                <FormRow>
                  <FormGroup>
                    <Label>Expiry Date</Label>
                    <Input type="text" placeholder="MM/YY" maxLength="5" required />
                  </FormGroup>
                  <FormGroup>
                    <Label>CVV</Label>
                    <Input type="text" placeholder="123" maxLength="3" required />
                  </FormGroup>
                </FormRow>
                <FormGroup>
                  <Label>Cardholder Name</Label>
                  <Input type="text" placeholder="Name on card" required />
                </FormGroup>
              </div>
            )}
            
            <FormGroup>
              <Label>
                <Input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ width: 'auto', marginRight: '10px' }}
                />
                UPI
              </Label>
            </FormGroup>
            
            {paymentMethod === 'upi' && (
              <div style={{ marginLeft: '30px', marginTop: '15px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                <FormGroup>
                  <Label>UPI ID</Label>
                  <Input type="text" placeholder="yourname@upi" required />
                </FormGroup>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
                  Enter your UPI ID (e.g., 9876543210@paytm, username@oksbi)
                </p>
              </div>
            )}
            
            <FormGroup>
              <Label>
                <Input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={paymentMethod === 'netbanking'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ width: 'auto', marginRight: '10px' }}
                />
                Net Banking
              </Label>
            </FormGroup>
            
            {paymentMethod === 'netbanking' && (
              <div style={{ marginLeft: '30px', marginTop: '15px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                <FormGroup>
                  <Label>Select Bank</Label>
                  <select style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} required>
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                    <option value="other">Other Banks</option>
                  </select>
                </FormGroup>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
                  You will be redirected to your bank's secure login page
                </p>
              </div>
            )}
          </Form>
        </Section>

        <Section>
          <SectionTitle>Order Summary</SectionTitle>
          <OrderSummary>
            {items.map(item => (
              <OrderItem key={item._id}>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <br />
                  <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                </ItemInfo>
                <ItemPrice>
                  ₹{(calculateItemPrice(item) * item.quantity).toFixed(0)}
                </ItemPrice>
              </OrderItem>
            ))}
            
            <OrderItem>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(0)}</span>
            </OrderItem>
            
            <OrderItem>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </OrderItem>
            
            <TotalRow>
              <span>Total</span>
              <span>₹{total.toFixed(0)}</span>
            </TotalRow>
          </OrderSummary>
        </Section>

        <PlaceOrderButton
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </PlaceOrderButton>
      </CheckoutContainer>
    </Container>
  );
};

export default Checkout;