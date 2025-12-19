import styled from 'styled-components';

export const Container = styled.div`
 // max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #F5DEB3;
  min-height: 100vh;
`;

export const Title = styled.h1`
  margin-top: 2rem;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

export const CheckoutContainer = styled.div`
  background: #FFF8DC;
  margin-top: 2rem;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;

  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

export const Section = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #e91e63;
  }
`;

export const OrderSummary = styled.div`
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
`;

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const ItemInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.span`
  font-weight: 500;
  color: #333;
`;

export const ItemQuantity = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

export const ItemPrice = styled.span`
  font-weight: bold;
  color: #e91e63;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: 2px solid #e91e63;
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #e91e63;
`;

export const PlaceOrderButton = styled.button`
  width: 100%;
  background: #8B6F47;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 111, 71, 0.4);
  
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

export const SuccessMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background: #E6F4EA;
  border-radius: 10px;
  color: #2e7d32;
`;

export const SuccessTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const OrderNumber = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 1rem 0;
`;

export const ContinueButton = styled.button`
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
  
  &:hover {
    background: #6d5636;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 111, 71, 0.6);
  }
`;