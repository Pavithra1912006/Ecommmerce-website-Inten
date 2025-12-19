import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Container,
  Banner,
  BannerTitle,
  BannerSubtitle,
  IntroText,
  Quote,
  CategoriesGrid,
  CategoryCard,
  CategoryImage,
  CategoryContent,
  CategoryTitle,
  CategoryDescription,
  CategorySection,
  CategoryHeading,
  ContentSection
} from './Home.styles';

const OffersSection = styled.div`
  background: linear-gradient(135deg, #FFF8DC 0%, #FFE4B5 100%);
  padding: 4rem 2rem;
  margin: 3rem 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '🎉';
    position: absolute;
    font-size: 10rem;
    opacity: 0.1;
    top: -2rem;
    right: -2rem;
    animation: rotate 20s infinite linear;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const OffersHeading = styled.h2`
  text-align: center;
  font-size: 3rem;
  background: linear-gradient(135deg, #8B6F47 0%, #A0826D 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  animation: slideIn 1s ease;
  
  @keyframes slideIn {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  &::before {
    content: '🔥 ';
  }
  
  &::after {
    content: ' 🔥';
  }
`;

const OffersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const OfferCard = styled.div`
  background: #FFF8DC;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.2);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.3), transparent);
    transform: rotate(45deg);
    animation: shine 3s infinite;
  }
  
  @keyframes shine {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 15px 40px rgba(139, 69, 19, 0.4);
  }
`;

const OfferIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const OfferTitle = styled.h3`
  font-size: 1.5rem;
  color: #8B6F47;
  margin-bottom: 0.5rem;
`;

const OfferDescription = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const OfferBadge = styled.div`
  background: linear-gradient(135deg, #FF6347 0%, #FF4500 100%);
  color: #FFF8DC;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.2rem;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(255, 69, 0, 0.4);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const categories = [
  {
    id: 'skincare',
    name: 'Skincare',
    description: 'Cleansers, moisturizers, serums & more',
    image: 'https://thedeconstruct.in/cdn/shop/files/Oily_Skin_Squad_Kit.webp?v=1755786842'
  },
  {
    id: 'makeup',
    name: 'Makeup',
    description: 'Lipsticks, foundations, eyeshadows & more',
    image: 'https://media.allaboutvision.com/cms/caas/v1/media/404494/data/picture/817669202507feac7808cc8382b47b0a.jpg'
  },
  {
    id: 'haircare',
    name: 'Haircare',
    description: 'Shampoos, conditioners, treatments & more',
    image: 'https://www.hcpwellness.in/wp-content/uploads/2024/02/haircare.jpg'
  },
  {
    id: 'bodycare',
    name: 'Bodycare',
    description: 'Body lotions, scrubs, oils & more',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe0v-qNNwsh0fiNuBFf_dFU2P8ezHk2tME0A&s'
  }
];

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  return (
    <Container>
      <Banner>
        <BannerTitle>Welcome to Trendy Tints</BannerTitle>
        <BannerSubtitle>Where Beauty Meets Confidence</BannerSubtitle>
        
        <IntroText>
          Discover a curated collection of premium beauty products that celebrate your unique style. 
          From skincare essentials to makeup must-haves, we bring you the finest selection to enhance your natural beauty.
        </IntroText>
        
        <Quote>
          "Beauty is power; a smile is its sword." - Embrace your radiance with Trendy Tints.
        </Quote>
        
        <OffersSection>
          <OffersHeading>Special Offers & Deals</OffersHeading>
          <OffersGrid>
            <OfferCard>
              <OfferIcon>💄</OfferIcon>
              <OfferTitle>Makeup Madness</OfferTitle>
              <OfferDescription>Get amazing discounts on all makeup products</OfferDescription>
              <OfferBadge>UP TO 50% OFF</OfferBadge>
            </OfferCard>
            <OfferCard>
              <OfferIcon>✨</OfferIcon>
              <OfferTitle>Skincare Special</OfferTitle>
              <OfferDescription>Premium skincare at unbeatable prices</OfferDescription>
              <OfferBadge>BUY 2 GET 1 FREE</OfferBadge>
            </OfferCard>
            <OfferCard>
              <OfferIcon>🎁</OfferIcon>
              <OfferTitle>Free Shipping</OfferTitle>
              <OfferDescription>On orders above ₹500</OfferDescription>
              <OfferBadge>FREE DELIVERY</OfferBadge>
            </OfferCard>
          </OffersGrid>
        </OffersSection>
        
        <CategorySection id="features">
          <ContentSection>
          <CategoryHeading>Shop by Category</CategoryHeading>
          <CategoriesGrid>
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            <CategoryImage image={category.image} />
            <CategoryContent>
              <CategoryTitle>{category.name}</CategoryTitle>
              <CategoryDescription>{category.description}</CategoryDescription>
            </CategoryContent>
          </CategoryCard>
        ))}
          </CategoriesGrid>
          </ContentSection>
        </CategorySection>
      </Banner>
      <div id="contact" />
    </Container>
  );
};

export default Home;