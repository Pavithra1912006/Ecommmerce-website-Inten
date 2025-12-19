import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import {
  Container,
  LeftSide,
  LeftContent,
  WelcomeTitle,
  WelcomeText,
  RightSide,
  FormContainer,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  LinkText,
  Link,
  ErrorMessage
} from './Auth.styles';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.register(formData);
      login(response.data.token, response.data.user);
      navigate('/categories');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LeftSide style={{backgroundImage: "url('https://thumbs.dreamstime.com/b/colorful-natural-beauty-arrangement-featuring-green-cosmetics-brushes-tropical-flower-textured-surface-showcases-359839797.jpg')"}}>
        <LeftContent>
          <WelcomeTitle>Join Trendy Tints!</WelcomeTitle>
          <WelcomeText>
            Create your account and unlock exclusive access to premium beauty products, 
            special offers, and personalized recommendations.
          </WelcomeText>
        </LeftContent>
      </LeftSide>

      <RightSide>
        <FormContainer>
          <Title>Sign Up</Title>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                minLength="6"
              />
            </FormGroup>
            
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </Form>
          
          <LinkText>
            Already have an account?{' '}
            <Link onClick={() => navigate('/login')}>
              Login here
            </Link>
          </LinkText>
        </FormContainer>
      </RightSide>
    </Container>
  );
};

export default Signup;