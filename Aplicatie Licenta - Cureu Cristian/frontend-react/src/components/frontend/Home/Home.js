import Navbar from "../../../layouts/frontend/Navbar";
import styled from "styled-components";
import Presentation from "./Presentation";
import Background from "./Background";

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Presentation />
      <Background />
    </Container>
  );
};

const Container = styled.div`
  max-height: 100vh;
  position: relative;
  overflow: hidden;
`;

export default Home;
