import { useState, useEffect } from 'react';
import { orderAPI } from '../../services/api';
import { useAlert } from '../../context/AlertContext';
import jsPDF from 'jspdf';
import {
  Container,
  Title,
  OrdersList,
  OrderCard,
  OrderHeader,
  OrderId,
  OrderDate,
  StatusBadge,
  OrderItems,
  OrderItem,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemDetails,
  OrderTotal,
  NoOrders,
  Loading
} from './Orders.styles';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getMyOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadBill = (order) => {
    const pdf = new jsPDF();
    
    pdf.setFontSize(20);
    pdf.text('TRENDY TINTS', 105, 20, { align: 'center' });
    pdf.setFontSize(16);
    pdf.text('PAYMENT BILL', 105, 30, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.text(`Order ID: ${order._id}`, 20, 50);
    pdf.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 60);
    pdf.text(`Status: ${order.status}`, 20, 70);
    
    pdf.text('Items:', 20, 90);
    
    let yPos = 100;
    order.products.forEach(item => {
      const itemText = `${item.product?.name || 'Product'} (Qty: ${item.quantity})`;
      const priceText = `₹${item.quantity * item.price}`;
      pdf.text(itemText, 20, yPos);
      pdf.text(priceText, 150, yPos);
      yPos += 10;
    });
    
    pdf.line(20, yPos + 5, 190, yPos + 5);
    pdf.setFontSize(14);
    pdf.text(`TOTAL: ₹${order.total}`, 150, yPos + 15);
    
    pdf.setFontSize(10);
    pdf.text('Thank you for shopping with Trendy Tints!', 105, yPos + 35, { align: 'center' });
    
    pdf.save(`TrendyTints_Bill_${order._id.slice(-8)}.pdf`);
  };

  const cancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await orderAPI.cancel(orderId);
        fetchOrders();
        showAlert('Order cancelled successfully!');
      } catch (error) {
        showAlert('Failed to cancel order: ' + (error.response?.data?.message || error.message), 'error');
      }
    }
  };

  const canCancelOrder = (order) => {
    return order.status === 'pending' || order.status === 'confirmed';
  };

  if (loading) return <Loading>Loading orders...</Loading>;

  if (orders.length === 0) {
    return (
      <Container>
        <Title>My Orders</Title>
        <NoOrders>
          <h2>No orders yet</h2>
          <p>Start shopping to see your orders here!</p>
        </NoOrders>
      </Container>
    );
  }

  return (
    <Container>
      <Title>My Orders</Title>
      
      <OrdersList>
        {orders.map(order => (
          <OrderCard key={order._id}>
            <OrderHeader>
              <div>
                <OrderId>Order #{order._id.slice(-8)}</OrderId>
                <br />
                <OrderDate>{new Date(order.createdAt).toLocaleDateString()}</OrderDate>
              </div>
              <StatusBadge status={order.status}>{order.status}</StatusBadge>
            </OrderHeader>

            <OrderItems>
              {order.products.map((item, index) => (
                <OrderItem key={index}>
                  <ItemImage
                    src={item.product?.image}
                    alt={item.product?.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/60x60?text=Product';
                    }}
                  />
                  <ItemInfo>
                    <ItemName>{item.product?.name}</ItemName>
                    <ItemDetails>
                      Quantity: {item.quantity} × ₹{item.price}
                    </ItemDetails>
                  </ItemInfo>
                </OrderItem>
              ))}
            </OrderItems>

            <OrderTotal>
              <span>Total:</span>
              <span>₹{order.total}</span>
            </OrderTotal>
            
            <div style={{ marginTop: '1rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              {canCancelOrder(order) && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  style={{
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Cancel Order
                </button>
              )}
              <button
                onClick={() => downloadBill(order)}
                style={{
                  background: '#8B6F47',
                  color: '#FFF8DC',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="download" style={{width: '16px', height: '16px', marginRight: '5px'}} /> Download Bill
              </button>
            </div>
          </OrderCard>
        ))}
      </OrdersList>
    </Container>
  );
};

export default Orders;
