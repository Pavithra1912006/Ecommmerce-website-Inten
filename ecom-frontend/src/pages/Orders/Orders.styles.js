import styled from 'styled-components';

export const Container = styled.div`
  //max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #F5DEB3;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
    margin-top: 2rem;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
    margin-top: 2rem;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const OrderCard = styled.div`
  background: #FFF8DC;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

export const OrderId = styled.span`
  font-weight: bold;
  color: #333;
`;

export const OrderDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

export const StatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'status'
})`
  background: ${props => {
    switch(props.status) {
      case 'pending': return '#ff9800';
      case 'confirmed': return '#2196f3';
      case 'shipped': return '#9c27b0';
      case 'delivered': return '#4caf50';
      case 'cancelled': return '#dc3545';
      default: return '#666';
    }
  }};
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;
`;

export const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
`;

export const OrderItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
`;

export const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
`;

export const ItemInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.h4`
  font-size: 1rem;
  color: #333;
  margin: 0 0 0.3rem 0;
`;

export const ItemDetails = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
`;

export const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-size: 1.2rem;
  font-weight: bold;
  color: #e91e63;
`;

export const NoOrders = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

export const Loading = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
`;
