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

const Login = () => {
  const [formData, setFormData] = useState({
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
      const response = await authAPI.login(formData);
      login(response.data.token, response.data.user);
      
      if (formData.email === 'admin@TrendyTints.com') {
        navigate('/admin');
      } else {
        navigate('/categories');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LeftSide>
        <LeftContent>
          <WelcomeTitle>Welcome Back!</WelcomeTitle>
          <WelcomeText>
            Discover premium beauty products from top brands. 
            Your journey to radiant beauty starts here with Trendy Tints.
          </WelcomeText>
        </LeftContent>
      </LeftSide>

      <RightSide>
        <FormContainer>
          <Title>Login</Title>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                required
              />
            </FormGroup>
            
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
          
          <LinkText>
            Don't have an account?{' '}
            <Link onClick={() => navigate('/signup')}>
              Sign up here
            </Link>
          </LinkText>
        </FormContainer>
      </RightSide>
    </Container>
  );
};

export default Login;