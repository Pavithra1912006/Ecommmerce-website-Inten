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

export const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const ImageSection = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProductImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: 600px;
  object-fit: cover;
  border-radius: 10px;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Brand = styled.p`
  color: #666;
  font-size: 1rem;
  margin: 0;
`;

export const ProductName = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Description = styled.p`
  color: #666;
  line-height: 1.6;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

export const Price = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #e91e63;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const OriginalPrice = styled.span`
  font-size: 1.5rem;
  color: #999;
  text-decoration: line-through;
`;

export const Discount = styled.span`
  background: #4caf50;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  font-weight: bold;
`;

export const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

export const QuantityLabel = styled.span`
  font-weight: 500;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const QuantityButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  
  &:hover {
    background: #f5f5f5;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const QuantityDisplay = styled.span`
  padding: 0.5rem 1rem;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  min-width: 50px;
  text-align: center;
`;

export const AddToCartButton = styled.button`
  background: #8B6F47;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 111, 71, 0.4);
  
  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    font-size: 1rem;
    width: 100%;
  }
  
  &:hover {
    background: #6d5636;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 111, 71, 0.6);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const StockInfo = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== 'inStock'
})`
  color: ${props => props.inStock ? '#4caf50' : '#f44336'};
  font-weight: 500;
`;

export const Loading = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
`;