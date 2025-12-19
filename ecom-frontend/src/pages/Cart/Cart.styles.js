import styled from 'styled-components';

export const Container = styled.div`
 // max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: #F5DEB3;
  min-height: 100vh;
  animation: fadeIn 0.5s ease;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  font-weight: 700;
  animation: slideIn 0.6s ease;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
  
  @keyframes slideIn {
    from { transform: translateX(-50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  &::before {
    content: '🛒 ';
  }
`;

export const CartContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #FFF8DC;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.15);
  transition: all 0.3s ease;
  animation: slideIn 0.5s ease;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
  
  @keyframes slideIn {
    from { transform: translateX(-30px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(139, 69, 19, 0.25);
  }
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
`;

export const ItemInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const ItemBrand = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
`;

export const ItemPrice = styled.p`
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const QuantityButton = styled.button`
  background: #f5f5f5;
  border: 1px solid #ddd;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #e0e0e0;
  }
`;

export const Quantity = styled.span`
  padding: 0 1rem;
  font-weight: 500;
`;

export const RemoveButton = styled.button`
  background: linear-gradient(135deg, #FF6347 0%, #FF4500 100%);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 69, 0, 0.4);
  
  &::before {
    content: '🗑️ ';
  }
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 69, 0, 0.6);
  }
`;

export const CartSummary = styled.div`
  background: #FFF8DC;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  height: fit-content;
`;

export const SummaryTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: ${props => props.total ? '2px solid #ca8f3dff' : '1px solid #eee'};
`;

export const SummaryLabel = styled.span`
  color: ${props => props.total ? '#ca8f3dff' : '#666'};
  font-weight: ${props => props.total ? 'bold' : 'normal'};
  font-size: ${props => props.total ? '1.2rem' : '1rem'};
`;

export const SummaryValue = styled.span`
  color: ${props => props.total ? '#ca8f3dff' : '#333'};
  font-weight: ${props => props.total ? 'bold' : 'normal'};
  font-size: ${props => props.total ? '1.2rem' : '1rem'};
`;

export const CheckoutButton = styled.button`
  width: 100%;
  background: #8B6F47;
  color: white;
  border: none;
  padding: 1.2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 111, 71, 0.4);
  
  &::before {
    content: '💳 ';
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(139, 111, 71, 0.6);
    background: #6d5636;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

export const EmptyCartTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const ShopButton = styled.button`
  background: #8B6F47;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 111, 71, 0.4);
  
  &::before {
    content: '🛍️ ';
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(139, 111, 71, 0.6);
    background: #6d5636;
  }
`;