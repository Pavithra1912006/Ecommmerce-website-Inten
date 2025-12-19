import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #8b6f47 0%, #a0826d 100%);
  color: #fff8dc;
`;

const TopBar = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  backdrop-filter: blur(10px);

  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ContactSection = styled.div`
  display: flex;
  gap: 3rem;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FooterMain = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 568px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div``;

const Logo = styled.h2`
  font-size: 1.8rem;
  font-style: italic;
  margin-bottom: 1rem;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: glow 2s infinite;

  @keyframes glow {
    0%,
    100% {
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
    50% {
      text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
    }
  }

  &::before {
    content: "✨ ";
  }
`;

const Description = styled.p`
  color: #ccc;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const ColumnTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 0.8rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #ffd700;
    transform: translateX(5px);
  }
`;

const Copyright = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
`;

const Footer = () => {
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <TopBar>
        <ContactSection>
          <ContactItem>
            <span style={{ fontSize: "1.5rem" }}>📧</span>
            <span>support@trendytints.com</span>
          </ContactItem>
          <ContactItem>
            <span style={{ fontSize: "1.5rem" }}>📞</span>
            <span>1800-267-4444</span>
          </ContactItem>
          <ContactItem>
            <span style={{ fontSize: "1.5rem" }}>📍</span>
            <span>Mumbai, India</span>
          </ContactItem>
        </ContactSection>
      </TopBar>

      <FooterMain>
        <FooterColumn>
          <Logo>Trendy Tints</Logo>
          <Description>
            Your trusted destination for premium beauty products. Discover
            authentic skincare, makeup, haircare, and bodycare products from top
            brands.
          </Description>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Quick Links</ColumnTitle>
          <LinkList>
            <LinkItem onClick={() => navigate("/")}>Home</LinkItem>
            <LinkItem onClick={() => navigate("/products")}>Shop All</LinkItem>
            <LinkItem onClick={() => navigate("/features")}>Features</LinkItem>
            <LinkItem onClick={() => navigate("/contact")}>Contact Us</LinkItem>
          </LinkList>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Categories</ColumnTitle>
          <LinkList>
            <LinkItem onClick={() => navigate("/categories")}>
              All Categories
            </LinkItem>
            <LinkItem onClick={() => navigate("/categories/skincare")}>
              Skincare
            </LinkItem>
            <LinkItem onClick={() => navigate("/categories/makeup")}>
              Makeup
            </LinkItem>
            <LinkItem onClick={() => navigate("/categories/haircare")}>
              Haircare
            </LinkItem>
            <LinkItem onClick={() => navigate("/categories/bodycare")}>
              Bodycare
            </LinkItem>
          </LinkList>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Follow Us</ColumnTitle>
          <LinkList>
            <LinkItem
              as="a"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              📘 Facebook
            </LinkItem>
            <br></br>
            <br></br>
            <LinkItem
              as="a"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              📷 Instagram
            </LinkItem>
            <br></br>
            <br></br>
            <LinkItem
              as="a"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              🐦 Twitter
            </LinkItem>
            <br></br>
            <br></br>
            <LinkItem
              as="a"
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              🎥 YouTube
            </LinkItem>
          </LinkList>
        </FooterColumn>
      </FooterMain>

      <Copyright>© 2024 Trendy Tints. All Rights Reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
