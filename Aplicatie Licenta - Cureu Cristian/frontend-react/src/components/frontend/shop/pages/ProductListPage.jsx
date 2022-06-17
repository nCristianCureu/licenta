import ShopNavBar from "../../../../layouts/frontend/shop/ShopNavBar";
import styled from "styled-components";
import Products from "../Products";
import Newsletter from "../Newsletter";
import Footer from "../Footer";
import { ArrowBackIosRounded } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function ProductListPage() {
  const location = useLocation();
  const cat = location.pathname.split("/")[3];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const handleFilters = (e) => {
    const value = e.target.value;
    // ...filters means that leave everything that is already inside filters and put the new selection
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  return (
    <Container>
      <ShopNavBar />
      <Title>
        {cat} section
        <Link to="/shop">
          <BackButton>
            <ArrowBackIosRounded />
          </BackButton>
        </Link>
      </Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Darkblue</Option>
            <Option>Green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
}

const Container = styled.div``;
const BackButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 1rem;
  color: #4e4e4e;
  display: flex;
  align-items: center;
  cursor: pointer;
  transform: scale(1.2);
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.4);
  }
  a {
    text-decoration: none;
  }
`;

const Title = styled.h1`
  position: relative;
  text-transform: uppercase;
  margin: 20px;
  text-align: center;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  cursor: pointer;
`;
const Option = styled.option``;

export default ProductListPage;
