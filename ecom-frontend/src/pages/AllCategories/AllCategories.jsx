import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  background: #F5DEB3;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  text-align: center;
  margin-bottom: 3rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled.div`
  background: #FFF8DC;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  }
`;

const CategoryImage = styled.div`
  height: 250px;
  background: url(${props => props.image}) center/cover;
`;

const CategoryContent = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CategoryDescription = styled.p`
  color: #666;
  line-height: 1.5;
`;

const AllCategories = () => {
  const navigate = useNavigate();

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

  return (
    <Container>
      <Title>Shop by Category</Title>
      <CategoriesGrid>
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            onClick={() => navigate(`/categories/${category.id}`)}
          >
            <CategoryImage image={category.image} />
            <CategoryContent>
              <CategoryTitle>{category.name}</CategoryTitle>
              <CategoryDescription>{category.description}</CategoryDescription>
            </CategoryContent>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </Container>
  );
};

export default AllCategories;