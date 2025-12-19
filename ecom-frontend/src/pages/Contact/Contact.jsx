import styled from 'styled-components';
import { toast } from 'react-toastify';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  text-align: center;
  margin-bottom: 3rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const InfoTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  color: #666;
  line-height: 1.6;
`;

const ContactForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #e91e63;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #e91e63;
  }
`;

const SubmitButton = styled.button`
  background: #e91e63;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background: #c2185b;
  }
`;

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for contacting us! We will get back to you soon.');
  };

  return (
    <Container>
      <Title>Get in Touch</Title>
      
      <ContactGrid>
        <ContactInfo>
          <InfoCard>
            <Icon>📧</Icon>
            <InfoTitle>Email Us</InfoTitle>
            <InfoText>support@trendytints.com</InfoText>
            <InfoText>We'll respond within 24 hours</InfoText>
          </InfoCard>
          
          <InfoCard>
            <Icon>📞</Icon>
            <InfoTitle>Call Us</InfoTitle>
            <InfoText>1800-267-4444</InfoText>
            <InfoText>Available: 8 AM to 10 PM (All days)</InfoText>
          </InfoCard>
          
          <InfoCard>
            <Icon>📍</Icon>
            <InfoTitle>Visit Us</InfoTitle>
            <InfoText>Trendy Tints Headquarters</InfoText>
            <InfoText>Mumbai, Maharashtra, India</InfoText>
          </InfoCard>
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit}>
          <h2 style={{ color: '#333', marginBottom: '1rem' }}>Send us a Message</h2>
          
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" placeholder="Your Name" required />
          </FormGroup>
          
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" placeholder="your@email.com" required />
          </FormGroup>
          
          <FormGroup>
            <Label>Subject</Label>
            <Input type="text" placeholder="How can we help?" required />
          </FormGroup>
          
          <FormGroup>
            <Label>Message</Label>
            <TextArea placeholder="Your message..." required />
          </FormGroup>
          
          <SubmitButton type="submit">Send Message</SubmitButton>
        </ContactForm>
      </ContactGrid>
    </Container>
  );
};

export default Contact;