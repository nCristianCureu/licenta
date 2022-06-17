import { Link } from "react-router-dom";
import styled from "styled-components";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined, HomeOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";

function ShopNavBar() {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Home>
            <Link to="/">
              <HomeIcon>
                <HomeOutlined style={{ transform: "scale(1.2)" }} />
              </HomeIcon>
            </Link>
          </Home>
        </Left>
        <Center>
          <Logo>Fantasy Shop</Logo>
        </Center>
        <Right>
          <MenuItem>
            <Link to="/shop/cart">
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  min-height: 10vh;
  background-color: #ffffff;
  color: #a6a6a6;
  box-shadow: 0 0 8px;
`;
const Wrapper = styled.div`
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div`
  flex: 1; // <=> width: 33,3%; 1/3 from parent element Wrapper
  display: flex;
  align-items: center;
`;
const Home = styled.span`
  font-size: 14px;
  cursor: pointer;
  a {
    color: black;
    text-decoration: none;
  }
`;
const HomeIcon = styled.div`
  margin-left: 1rem;
  display: flex;
  cursor: pointer;
  transition: all .3s ease;
  &:hover {
    color: rgba(0, 0, 0, 0.7);
    transform: scale(1.2);
  }
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-size: 1.4rem;
  color: black;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin: 0rem 1rem;
  transition: all .3s ease;
  a {
    color: black;
    text-decoration: none;
  }
  &:hover {
    transform: scale(1.2);
  }
`;

export default ShopNavBar;
