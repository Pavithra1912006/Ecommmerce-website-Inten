import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { productAPI, reviewAPI } from "../../services/api";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAlert } from "../../context/AlertContext";
import { useAuth } from "../../context/AuthContext";
import {
  Container,
  ProductContainer,
  ImageSection,
  ProductImage,
  InfoSection,
  Brand,
  ProductName,
  Description,
  PriceContainer,
  Price,
  OriginalPrice,
  Discount,
  QuantitySection,
  QuantityLabel,
  QuantityControls,
  QuantityButton,
  QuantityDisplay,
  AddToCartButton,
  StockInfo,
  Loading,
} from "./ProductDetail.styles";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showAlert } = useAlert();
  const { user } = useAuth();

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(id);
      setProduct(response.data);
      // Increment view count
      productAPI.incrementView(id).catch(console.error);
      // Update local state immediately
      setProduct(prev => ({ ...prev, views: (prev.views || 0) + 1 }));
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await reviewAPI.getProductReviews(id);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }, [id]);

  const handleSubmitReview = async () => {
    if (!user) {
      showAlert("Please login to submit a review");
      return;
    }
    if (userRating === 0 || !userComment.trim()) {
      showAlert("Please provide both rating and comment");
      return;
    }
    try {
      await reviewAPI.addReview({
        productId: id,
        rating: userRating,
        comment: userComment,
      });
      showAlert("Review submitted successfully!");
      setUserRating(0);
      setUserComment("");
      setShowReviewForm(false);
      fetchReviews();
      fetchProduct(); // Refresh to get updated rating
    } catch {
      showAlert("Error submitting review");
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showAlert("Added to cart!");
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      showAlert("Removed from wishlist!");
    } else {
      addToWishlist(product);
      showAlert("Added to wishlist!");
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };

  if (loading) return <Loading>Loading product...</Loading>;

  if (!product) return <Loading>Product not found</Loading>;

  const isInStock = product.quantity > 0;
  const finalPrice =
    product.discount > 0
      ? calculateDiscountedPrice(product.price, product.discount)
      : product.price;

  return (
    <Container>
      <ProductContainer>
        <ImageSection>
          <ProductImage
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x400?text=Product";
            }}
          />
        </ImageSection>

        <InfoSection>
          <Brand>{product.brand}</Brand>
          <ProductName>{product.name}</ProductName>
          <Description>{product.description}</Description>

          <PriceContainer>
            <Price>₹{finalPrice.toFixed(0)}</Price>
            {product.discount > 0 && (
              <>
                <OriginalPrice>₹{product.price}</OriginalPrice>
                <Discount>{product.discount}% OFF</Discount>
              </>
            )}
          </PriceContainer>

          <div style={{ margin: "1rem 0" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ color: "#ffa500", fontSize: "1.2rem" }}>★</span>
              <span>
                {product.rating > 0 ? product.rating.toFixed(1) : "No ratings"}
              </span>
              <span>({product.numReviews} reviews)</span>
              <span style={{ marginLeft: '1rem', color: '#666' }}>👁 {product.views || 0} views</span>
            </div>
            {user && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                style={{
                  background: "#776129ff",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                {showReviewForm ? "Cancel Review" : "Write a Review"}
              </button>
            )}
          </div>

          {showReviewForm && (
            <div
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                borderRadius: "8px",
                margin: "1rem 0",
                background: "#f9f9f9",
              }}
            >
              <h4>Write a Review</h4>
              <div style={{ marginBottom: "1rem" }}>
                <label>Rating: </label>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setUserRating(star)}
                    style={{
                      cursor: "pointer",
                      color: star <= userRating ? "#ffa500" : "#ddd",
                      fontSize: "1.5rem",
                      marginLeft: "0.2rem",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="Write your review..."
                style={{
                  width: "100%",
                  minHeight: "80px",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  marginBottom: "1rem",
                }}
              />
              <button
                onClick={handleSubmitReview}
                style={{
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Submit Review
              </button>
            </div>
          )}

          <StockInfo inStock={isInStock}>
            {isInStock
              ? `In Stock (${product.quantity} available)`
              : "Out of Stock"}
          </StockInfo>

          {isInStock && (
            <>
              <QuantitySection>
                <QuantityLabel>Quantity:</QuantityLabel>
                <QuantityControls>
                  <QuantityButton
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </QuantityButton>
                  <QuantityDisplay>{quantity}</QuantityDisplay>
                  <QuantityButton
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.quantity}
                  >
                    +
                  </QuantityButton>
                </QuantityControls>
              </QuantitySection>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexDirection: window.innerWidth <= 768 ? "column" : "row",
                }}
              >
                <AddToCartButton onClick={handleAddToCart}>
                  Add to Cart
                </AddToCartButton>
                <AddToCartButton
                  onClick={handleWishlistToggle}
                  style={{
                    background: isInWishlist(product._id)
                      ? "#dc3545"
                      : "#6c757d",
                  }}
                >
                  {isInWishlist(product._id)
                    ? "❤️ Remove from Wishlist"
                    : "🤍 Add to Wishlist"}
                </AddToCartButton>
              </div>
            </>
          )}

          {reviews.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
              <h3>Customer Reviews</h3>
              {reviews.map((review) => (
                <div
                  key={review._id}
                  style={{
                    border: "1px solid #eee",
                    padding: "1rem",
                    marginBottom: "1rem",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <strong>{review.user.name}</strong>
                    <div>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          style={{
                            color: i < review.rating ? "#ffa500" : "#ddd",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "#666" }}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </InfoSection>
      </ProductContainer>
    </Container>
  );
};

export default ProductDetail;
