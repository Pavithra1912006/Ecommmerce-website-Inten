import { useState, useEffect } from 'react';
import { feedbackAPI } from '../../services/api';
import { useAlert } from '../../context/AlertContext';
import {
  Container,
  Title,
  FeedbackForm,
  FormGroup,
  Label,
  TextArea,
  RatingContainer,
  Star,
  SubmitButton,
  FeedbackList,
  FeedbackCard,
  FeedbackHeader,
  FeedbackDate,
  StatusBadge,
  FeedbackMessage,
  Loading
} from './Feedback.styles';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({
    message: '',
    rating: 0
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await feedbackAPI.getMyFeedback();
      setFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.message || formData.rating === 0) {
      showAlert('Please provide both message and rating', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await feedbackAPI.submit(formData);
      setFormData({ message: '', rating: 0 });
      fetchFeedback();
      showAlert('Feedback submitted successfully!');
    } catch (error) {
      showAlert('Failed to submit feedback', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  return (
    <Container>
      <Title>Share Your Feedback</Title>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>Submit New Feedback</h2>
      </div>
      
      <FeedbackForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Your Message</Label>
          <TextArea
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Share your experience with us..."
            rows="4"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Rating</Label>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                active={star <= formData.rating}
                onClick={() => handleRatingClick(star)}
              >
                ★
              </Star>
            ))}
          </RatingContainer>
        </FormGroup>
        
        <SubmitButton type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </SubmitButton>
      </FeedbackForm>

      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>Your Previous Feedback</h2>
        {loading ? (
          <Loading>Loading feedback...</Loading>
        ) : feedback.length === 0 ? (
          <div style={{ 
            background: '#FFF8DC', 
            padding: '2rem', 
            borderRadius: '10px', 
            textAlign: 'center', 
            color: '#666' 
          }}>
            <p>You haven't submitted any feedback yet. Use the form above to share your experience!</p>
          </div>
        ) : (
          <FeedbackList>
            {feedback.map(item => (
              <FeedbackCard key={item._id}>
                <FeedbackHeader>
                  <div>
                    <div>Rating: {'★'.repeat(item.rating)}</div>
                    <FeedbackDate>{new Date(item.createdAt).toLocaleDateString()}</FeedbackDate>
                  </div>
                  <StatusBadge status={item.status}>{item.status}</StatusBadge>
                </FeedbackHeader>
                <FeedbackMessage>{item.message}</FeedbackMessage>
              </FeedbackCard>
            ))}
          </FeedbackList>
        )}
      </div>
    </Container>
  );
};

export default Feedback;