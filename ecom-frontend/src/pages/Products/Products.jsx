import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { productAPI } from '../../services/api';
import {
  Container,
  Header,
  Title,
  FilterContainer,
  FilterGroup,
  FilterLabel,
  Select,
  Input,
  ClearButton,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductBrand,
  ProductName,
  PriceContainer,
  Price,
  OriginalPrice,
  Discount,
  Rating,
  Stars,
  RatingText,
  Loading,
  NoProducts
} from './Products.styles';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get('category');
  const type = searchParams.get('type');
  
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    discount: '',
    sort: 'newest'
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Debounce price filters
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.minPrice, filters.maxPrice]);

  // Update debounced filters immediately for non-price filters
  useEffect(() => {
    setDebouncedFilters(prev => ({
      ...prev,
      discount: filters.discount,
      sort: filters.sort
    }));
  }, [filters.discount, filters.sort]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (category) params.category = category;
      if (type) params.type = type;
      if (debouncedFilters.minPrice) params.minPrice = debouncedFilters.minPrice;
      if (debouncedFilters.maxPrice) params.maxPrice = debouncedFilters.maxPrice;
      if (debouncedFilters.discount) params.discount = debouncedFilters.discount;
      if (debouncedFilters.sort) params.sort = debouncedFilters.sort;
      
      console.log('Fetching with params:', params);
      const response = await productAPI.getAll(params);
      console.log('Response:', response.data);
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [category, type, debouncedFilters.minPrice, debouncedFilters.maxPrice, debouncedFilters.discount, debouncedFilters.sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    console.log('URL Params - Category:', category, 'Type:', type);
  }, [category, type]);
  
  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);
  
  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      discount: '',
      sort: 'newest'
    });
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };



  if (loading) return <Loading>Loading products...</Loading>;

  return (
    <Container>
      <Header>
        <Title>
          {category && type ? `${category} - ${type}` : 
           category ? category : 
           'Shop All Products'}
        </Title>
      </Header>

      <FilterContainer>
        <FilterGroup>
          <FilterLabel>Type</FilterLabel>
          <Select
            value={type || ''}
            onChange={(e) => {
              const newType = e.target.value;
              if (newType) {
                navigate(`/products?category=${category}&type=${newType}`);
              } else {
                navigate(`/products?category=${category}`);
              }
            }}
          >
            <option value="">All Types</option>
            {category === 'skincare' && (
              <>
                <option value="cleanser">Cleanser</option>
                <option value="moisturizer">Moisturizer</option>
                <option value="serum">Serum</option>
                <option value="sunscreen">Sunscreen</option>
              </>
            )}
            {category === 'makeup' && (
              <>
                <option value="foundation">Foundation</option>
                <option value="lipstick">Lipstick</option>
                <option value="eyeshadow">Eyeshadow</option>
                <option value="mascara">Mascara</option>
              </>
            )}
            {category === 'haircare' && (
              <>
                <option value="shampoo">Shampoo</option>
                <option value="conditioner">Conditioner</option>
                <option value="hair-oil">Hair Oil</option>
                <option value="styling">Styling</option>
              </>
            )}
            {category === 'bodycare' && (
              <>
                <option value="body-lotion">Body Lotion</option>
                <option value="body-wash">Body Wash</option>
                <option value="scrub">Scrub</option>
                <option value="perfume">Perfume</option>
              </>
            )}
          </Select>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Min Price</FilterLabel>
          <Input
            type="text"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          //  onInput={(e) => handleFilterChange('minPrice', e.target.value)}
          />
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Max Price</FilterLabel>
          <Input
            type="text"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
           // onInput={(e) => handleFilterChange('maxPrice', e.target.value)}
          />
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Min Discount</FilterLabel>
          <Select
            value={filters.discount}
            onChange={(e) => handleFilterChange('discount', e.target.value)}
          >
            <option value="">Any</option>
            <option value="10">10% or more</option>
            <option value="20">20% or more</option>
            <option value="30">30% or more</option>
          </Select>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Sort By</FilterLabel>
          <Select
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </Select>
        </FilterGroup>
        
        <ClearButton onClick={clearFilters}>Clear Filters</ClearButton>
      </FilterContainer>

      {products.length === 0 ? (
        <NoProducts>No products found</NoProducts>
      ) : (
        <ProductsGrid>
          {products.map(product => (
            <ProductCard
              key={product._id}
              onClick={() => handleProductClick(product._id)}
            >
              <ProductImage
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/250x250?text=Product';
                }}
              />
              <ProductInfo>
                <ProductBrand>{product.brand}</ProductBrand>
                <ProductName>{product.name}</ProductName>
                <PriceContainer>
                  <Price>
                    {product.discount > 0 
                      ? calculateDiscountedPrice(product.price, product.discount).toFixed(0)
                      : product.price}
                  </Price>
                  {product.discount > 0 && (
                    <>
                      <OriginalPrice>₹{product.price}</OriginalPrice>
                      <Discount>{product.discount}% OFF</Discount>
                    </>
                  )}
                </PriceContainer>
                {product.rating > 0 && (
                  <Rating>
                    <Stars>★</Stars>
                    <RatingText>{product.rating} ({product.numReviews})</RatingText>
                  </Rating>
                )}
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      )}
    </Container>
  );
};

export default Products;