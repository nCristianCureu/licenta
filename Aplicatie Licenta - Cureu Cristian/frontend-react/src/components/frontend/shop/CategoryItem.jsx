import styled from "styled-components";
import { Link } from "react-router-dom";

function CategoryItem({ item }) {
  return (
    <Container>
      <Link to={`/shop/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
        <Background>
          <Info>
            <Title>{item.title}</Title>
            <Button>SHOP NOW</Button>
          </Info>
        </Background>
      </Link>
    </Container>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
  &:hover {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
`;
const Container = styled.div`
  width: 30%;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  margin: auto;
  height: 100%;
  object-fit: cover;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const Title = styled.h1`
  margin-top: 7rem;
  color: white;
  letter-spacing: 2px;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;
const Button = styled.button`
  letter-spacing: 0.5px;
  border: 2px solid white;
  border-radius: 2px;
  background-color: transparent;
  color: white;
  padding: 0.5rem 0.8rem;
  font-weight: bold;
  cursor: pointer;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 12px 17px rgba(0, 0, 0, 0.1);
`;

export default CategoryItem;
