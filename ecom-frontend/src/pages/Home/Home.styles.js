import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  padding: 0;
  background: #F5DEB3;
`;

export const Banner = styled.div`
  background: url('https://www.fdli.org/wp-content/uploads/2020/05/The-Regulation-of-Cosmetics-scaled.jpeg') center/cover,
    #D2B48C;
  color: white;
  padding: 8rem 2rem 5rem;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  animation: fadeIn 1s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://www.transparenttextures.com/patterns/cubes.png');
    opacity: 0.1;
    animation: float 20s infinite linear;
  }
  
  @keyframes float {
    from { background-position: 0 0; }
    to { background-position: 100px 100px; }
  }
`;

export const BannerTitle = styled.h1`
  font-size: 5rem;
  margin-bottom: 1.5rem;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.4);
  font-weight: 700;
  letter-spacing: 3px;
  background: linear-gradient(45deg, #fff, #FFD700, #FFA500, #fff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s infinite, bounceIn 1s ease;
  position: relative;
  z-index: 1;
  
  @keyframes shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes bounceIn {
    0% { transform: scale(0.5); opacity: 0; }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }
  
  &::before {
    content: '✨';
    margin-right: 1rem;
  }
  
  &::after {
    content: '✨';
    margin-left: 1rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const BannerSubtitle = styled.p`
  font-size: 1.8rem;
  opacity: 0.95;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
  font-weight: 300;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const IntroText = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.8;
  opacity: 0.9;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`;

export const Quote = styled.div`
  font-size: 1.5rem;
  font-style: italic;
  margin: 2rem auto;
  max-width: 700px;
  opacity: 0.95;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
  border-left: 4px solid rgba(255, 215, 0, 0.8);
  padding-left: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 1rem 0 1.5rem;
  }
`;

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

export const CategoryCard = styled.div`
  background: #FFF8DC;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.3);
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  animation: slideUp 0.6s ease;
  
  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.9), rgba(210, 105, 30, 0.9));
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }
  
  &::after {
    content: '→';
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 2rem;
    color: #FFD700;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.4s ease;
    z-index: 2;
  }
  
  &:hover {
    transform: translateY(-15px) scale(1.03) rotate(1deg);
    box-shadow: 0 20px 50px rgba(139, 69, 19, 0.5);
    
    &::before {
      opacity: 0.9;
    }
    
    &::after {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const CategoryImage = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'image'
})`
  height: 180px;
  background: url(${props => props.image}) center/cover;
  background-color: #f5f5f5;
`;

export const CategoryContent = styled.div`
  padding: 1.5rem;
  position: relative;
  z-index: 2;
  transition: all 0.4s ease;
  
  ${CategoryCard}:hover & {
    color: #FFF8DC;
  }
`;

export const CategoryTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 700;
  transition: color 0.4s ease;
  
  ${CategoryCard}:hover & {
    color: #FFF8DC;
  }
`;

export const CategoryDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
  transition: color 0.4s ease;
  
  ${CategoryCard}:hover & {
    color: rgba(255, 248, 220, 0.9);
  }
`;

export const CategorySection = styled.div`
  margin-top: 4rem;
`;

export const CategoryHeading = styled.h2`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
  font-weight: 600;
`;

export const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;