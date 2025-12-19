import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Header,
  Title,
  TypesGrid,
  TypeCard,
  TypeIcon,
  TypeName,
  TypeDescription
} from './Categories.styles';

const categoryTypes = {
  skincare: [
    { id: 'cleanser', name: 'Cleansers', icon: 'https://tse3.mm.bing.net/th/id/OIP.b6xpGwlUMAC8gzGbnkNP8gHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', description: 'Face washes & cleansing oils' },
    { id: 'moisturizer', name: 'Moisturizers', icon: 'https://nypost.com/wp-content/uploads/sites/2/2021/02/best-face-moisturizers.jpg?quality=75&strip=all', description: 'Day & night creams' },
    { id: 'serum', name: 'Serums', icon: 'https://m.media-amazon.com/images/I/81oyWyvrIoL.jpg', description: 'Vitamin C, retinol & more' },
    { id: 'sunscreen', name: 'Sunscreen', icon: 'https://th.bing.com/th/id/OIP.6ZqKCSAXBWHVvlK5AWwCpQHaI7?w=171&h=207&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1', description: 'SPF protection' }
  ],
  makeup: [
    { id: 'foundation', name: 'Foundation', icon: 'https://th.bing.com/th/id/OIP.Jiq6EdSk0Irv_tm1DH26NAHaE8?w=295&h=197&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1', description: 'Liquid & powder foundations' },
    { id: 'lipstick', name: 'Lipstick', icon: 'https://th.bing.com/th/id/OIP.SgbOq0OW5zDmlxoeRaqt-QHaEJ?w=313&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1', description: 'Matte & glossy lipsticks' },
    { id: 'eyeshadow', name: 'Eyeshadow', icon: 'https://th.bing.com/th/id/OIP.1QQpzCujaqDp8yo2G8GncAHaEK?w=311&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1', description: 'Palettes & singles' },
    { id: 'mascara', name: 'Mascara', icon: 'https://www.arabiaweddings.com/sites/default/files/styles/max980/public/articles/2019/07/mascara_3.jpg?itok=JoL5Je-s', description: 'Lengthening & volumizing' }
  ],
  haircare: [
    { id: 'shampoo', name: 'Shampoo', icon: 'https://m.media-amazon.com/images/I/71XakyZMH1L._SX679_.jpg', description: 'For all hair types' },
    { id: 'conditioner', name: 'Conditioner', icon: 'https://th.bing.com/th/id/OIP.Osbl-CWcx3LRfauK_lqBIgHaHa?w=211&h=211&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1', description: 'Deep conditioning treatments' },
    { id: 'hair-oil', name: 'Hair Oil', icon: 'https://th.bing.com/th/id/OIP.klN_Pbl7NaGz3wcFoM2ZIAHaEU?w=294&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1', description: 'Nourishing hair oils' },
    { id: 'styling', name: 'Styling', icon: 'https://tse2.mm.bing.net/th/id/OIP.acLtc4a7WQbwHAQ-rEdixwHaDt?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', description: 'Gels, sprays & creams' }
  ],
  bodycare: [
    { id: 'body-lotion', name: 'Body Lotion', icon: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/79a78492-5c83-404b-a2ab-ad4394fac5bd.__CR0,0,970,600_PT0_SX970_V1___.jpg', description: 'Moisturizing lotions' },
    { id: 'body-wash', name: 'Body Wash', icon: 'https://th.bing.com/th/id/OIP.AcjM956VsHN2Z_SV90r1ZAHaEk?w=313&h=193&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1', description: 'Cleansing body washes' },
    { id: 'scrub', name: 'Body Scrub', icon: 'https://static1.businessinsider.com/image/5bbba2fb2e71290eb25057f3-1200/the-best-sugar-body-scrub.jpg', description: 'Exfoliating scrubs' },
    { id: 'perfume', name: 'Perfume', icon: 'https://th.bing.com/th/id/OIP.xweqVPOIfPogP5ODrneaJAHaEK?w=247&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1', description: 'Fragrances & body mists' }
  ]
};

const Categories = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const types = categoryTypes[category] || [];

  if (!categoryTypes[category]) {
    return (
      <Container>
        <Header>
          <Title>Category Not Found</Title>
        </Header>
        <div style={{textAlign: 'center', padding: '3rem'}}>
          <p>This category doesn't exist. Please choose from: Skincare, Makeup, Haircare, or Bodycare.</p>
        </div>
      </Container>
    );
  }

  const handleTypeClick = (type) => {
    navigate(`/products?category=${category}&type=${type}`);
  };

  return (
    <Container>
      <Header>
        <Title>{category}</Title>
      </Header>

      <TypesGrid>
        {types.map(type => (
          <TypeCard
            key={type.id}
            onClick={() => handleTypeClick(type.id)}
          >
            <TypeIcon src={type.icon} alt={type.name} />
            <TypeName>{type.name}</TypeName>
            <TypeDescription>{type.description}</TypeDescription>
          </TypeCard>
        ))}
      </TypesGrid>
    </Container>
  );
};

export default Categories;