import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import {
  Container,
  Title,
  WishlistGrid,
  WishlistCard,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductBrand,
  ProductPrice,
  ButtonGroup,
  Button,
  RemoveButton,
  NoItems
} from './Wishlist.styles';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (wishlistItems.length === 0) {
    return (
      <Container>
        <Title>My Wishlist</Title>
        <NoItems>
          <h2>Your wishlist is empty</h2>
          <p>Add products you love to your wishlist!</p>
          <Button onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </NoItems>
      </Container>
    );
  }

  return (
    <Container>
      <Title>My Wishlist ({wishlistItems.length} items)</Title>
      
      <WishlistGrid>
        {wishlistItems.map(product => (
          <WishlistCard key={product._id}>
            <ProductImage
              src={product.image}
              alt={product.name}
              onClick={() => handleProductClick(product._id)}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/200x200?text=Product';
              }}
            />
            <ProductInfo>
              <ProductBrand>{product.brand}</ProductBrand>
              <ProductName onClick={() => handleProductClick(product._id)}>
                {product.name}
              </ProductName>
              <ProductPrice>₹{product.price}</ProductPrice>
              
              <ButtonGroup>
                <Button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
                <RemoveButton onClick={() => handleRemoveFromWishlist(product._id)}>
                  Remove
                </RemoveButton>
              </ButtonGroup>
            </ProductInfo>
          </WishlistCard>
        ))}
      </WishlistGrid>
    </Container>
  );
};

export default Wishlist;