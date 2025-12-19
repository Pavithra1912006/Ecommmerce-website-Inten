import styled from 'styled-components';

export const Container = styled.div`
  //max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: #F5DEB3;
  min-height: 100vh;
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const Header = styled.div`
  margin-bottom: 2rem;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

export const Select = styled.select`
  padding: 0.7rem 1rem;
  border: 2px solid #D2691E;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  background: #FFF8DC;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 100%;
  }
  
  &:focus {
    outline: none;
    border-color: #8B4513;
    box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.2);
    transform: scale(1.02);
  }
  
  &:hover {
    border-color: #8B4513;
  }
`;

export const Input = styled.input`
  padding: 0.7rem 1rem;
  border: 2px solid #D2691E;
  border-radius: 12px;
  font-size: 1rem;
  width: 140px;
  background: #FFF8DC;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 100%;
  }
  
  &:focus {
    outline: none;
    border-color: #8B4513;
    box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.2);
    transform: scale(1.02);
  }
  
  &:hover {
    border-color: #8B4513;
  }
  
  /* Hide number input spinner */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

export const ClearButton = styled.button`
  background: #8B6F47;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  align-self: flex-end;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 111, 71, 0.4);
  
  &::before {
    content: '✖ ';
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(139, 111, 71, 0.6);
    background: #6d5636;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: capitalize;
  font-weight: 700;
  animation: slideIn 0.6s ease;
  
  @keyframes slideIn {
    from { transform: translateX(-50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  &::before {
    content: '🛍️ ';
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

export const ProductCard = styled.div`
  background: #FFF8DC;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.2);
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  animation: fadeInUp 0.6s ease;
  
  @keyframes fadeInUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(210, 105, 30, 0.1));
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }
  
  &::after {
    content: '👁️ View';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: rgba(139, 69, 19, 0.95);
    color: white;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-weight: bold;
    z-index: 2;
    transition: all 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-15px) scale(1.03);
    box-shadow: 0 20px 50px rgba(139, 69, 19, 0.4);
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  padding: 1rem;
`;

export const ProductBrand = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
`;

export const ProductName = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const Price = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  &::before {
    content: '₹';
  }
`;

export const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
`;

export const Discount = styled.span`
  background: linear-gradient(135deg, #FF6347 0%, #FF4500 100%);
  color: white;
  padding: 0.3rem 0.7rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(255, 69, 0, 0.4);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.5rem;
`;

export const Stars = styled.span`
  color: #ffa726;
  font-size: 0.9rem;
`;

export const RatingText = styled.span`
  color: #666;
  font-size: 0.85rem;
`;

export const Loading = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
`;

export const NoProducts = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
`;