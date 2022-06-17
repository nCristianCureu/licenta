import styled from "styled-components";
import Navbar from "../../../layouts/frontend/Navbar";
import Map from "./Map";

function LocationPage() {
  return (
    <Container>
      <Navbar />
      <Map />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default LocationPage;
