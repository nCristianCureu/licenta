import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Fantasy Shop</Logo>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <Link to="/shop/cart">
            <ListItem>Cart</ListItem>
          </Link>
          <Link to="/shop/products/home">
            <ListItem>Home Kit</ListItem>
          </Link>
          <Link to="/shop/products/away">
            <ListItem>Away Kit</ListItem>
          </Link>
          <Link to="/shop/products/third">
            <ListItem>Third Kit</ListItem>
          </Link>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} />
          420033 Baia Mare
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +40 748 338 571
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> fantasyshop@gmail.com
        </ContactItem>
        <Payment>
          <img src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Payment>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  height: 40vh;
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  margin-bottom: 2rem;
`;

const SocialContainer = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  align-items: center;
`;

const Title = styled.h3`
  margin-bottom: 30px;
  text-align: center;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  a {
    text-decoration: none;
  }
`;

const ListItem = styled.li`
  width: 100%;
  margin-bottom: 10px;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Payment = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 50%;
  }
`;

export default Footer;
