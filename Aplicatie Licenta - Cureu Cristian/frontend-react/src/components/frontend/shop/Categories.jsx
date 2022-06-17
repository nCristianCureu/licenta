import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { categories } from "./data";

function Categories() {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem key={item.id} item={item} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-around;
`;

export default Categories;
