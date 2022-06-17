import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Search
} from "@material-ui/icons";
function Product({ item }) {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Icon>
          <Link to={`/shop/product/${item._id}`}>
            <Search />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  margin: 5px;
  flex: 1;
  min-width: 300px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
  position: relative;
`;
const Image = styled.img`
  height: 70%;
  z-index: 2;
`;
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  transition: opacity 1s ease;
  &:hover {
    opacity: 1;
  }
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    background-color: aliceblue;
    transform: scale(1.2);
  }
  a {
    color: #424242;
    text-decoration: none;
  }
`;

export default Product;
