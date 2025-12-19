import styled from 'styled-components';

const Container = styled.div`
 //max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  background:  #F5DEB3;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  text-align: center;
  margin-bottom: 3rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const Features = () => {
  const features = [
    {
      icon: '🛍️',
      title: 'Wide Product Range',
      description: 'Explore thousands of beauty products from top brands across skincare, makeup, haircare, and bodycare.'
    },
    {
      icon: '✨',
      title: 'Premium Quality',
      description: 'All products are 100% authentic and sourced directly from authorized distributors.'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly with our express shipping options across India.'
    },
    {
      icon: '💳',
      title: 'Secure Payments',
      description: 'Shop with confidence using our secure payment gateway with multiple payment options.'
    },
    {
      icon: '🎁',
      title: 'Exclusive Offers',
      description: 'Enjoy special discounts, deals, and offers on your favorite beauty products.'
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Our customer support team is always ready to help you with any queries or concerns.'
    }
  ];

  return (
    <Container>
      <Title>Why Choose Trendy Tints?</Title>
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <Icon>{feature.icon}</Icon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </Container>
  );
};

export default Features;