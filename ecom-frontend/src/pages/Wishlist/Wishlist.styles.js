import styled from 'styled-components';

export const Container = styled.div`
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
  text-align: center;
`;

export const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
`;

export const WishlistCard = styled.div`
  background: #FFF8DC;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1rem;
`;

export const ProductInfo = styled.div`
  text-align: center;
`;

export const ProductBrand = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
`;

export const ProductName = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 0 0 0.5rem 0;
  cursor: pointer;
  
  &:hover {
    color: #8B6F47;
  }
`;

export const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #8B6F47;
  margin: 0 0 1rem 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  
  @media (max-width: 480px) {
    gap: 0.3rem;
  }
`;

export const Button = styled.button`
  background: #8B6F47;
  color: #FFF8DC;
  border: none;
  padding: 0.7rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
  
  &:hover {
    background: #6d5636;
  }
`;

export const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.7rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
  
  &:hover {
    background: #c82333;
  }
`;

export const NoItems = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  max-width: 400px;
  margin: 0 auto;
  
  h2 {
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
  }
`;