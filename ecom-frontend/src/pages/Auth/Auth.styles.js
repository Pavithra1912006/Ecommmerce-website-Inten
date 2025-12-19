import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftSide = styled.div`
  background: url('https://www.pharmaadda.in/wp-content/uploads/2020/02/Top-Cosmetic-Manufacturers-in-Delhi-1024x683.jpg') center/cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  
  @media (max-width: 968px) {
    min-height: 300px;
  }
`;

export const LeftContent = styled.div`
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  padding: 2rem;
  max-width: 500px;
`;

export const WelcomeTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const WelcomeText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const RightSide = styled.div`
  background: #F5DEB3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const FormContainer = styled.div`
  background: #FFF8DC;
  padding: 3rem;
  border-radius: 0 50px 0 50px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 450px;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #8B6F47;
  }
`;

export const Button = styled.button`
  background: #8B6F47;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s;
  
  &:hover {
    background: #6d5636;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const LinkText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
`;

export const Link = styled.span`
  color: #8B6F47;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;