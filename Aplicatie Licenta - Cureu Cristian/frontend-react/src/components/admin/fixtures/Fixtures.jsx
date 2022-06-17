import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userRequest } from "../../../requestMethods";

function Fixtures() {
  const [fixtures, setFixtures] = useState([]);
  useEffect(() => {
    const getFixtures = async () => {
      try {
        const res = await userRequest.get("/matches");
        setFixtures(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFixtures();
  }, []);
  return (
    <Container>
      <AllFixtures>
        {fixtures.map((fixture) => (
          <Fixture key={fixture._id}>
            <Link to={`/admin/fixtures/${fixture._id}`}>
              <h2>{fixture.opponent}</h2>
            </Link>
            <DateInfo>
              <Date>{fixture.date}</Date>
            </DateInfo>
          </Fixture>
        ))}
      </AllFixtures>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  min-height: 80vh;
`;
const AllFixtures = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 0.5rem;
`;

const Fixture = styled.div`
  position: relative;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 4px;
  margin: 2rem;
  box-shadow: 0 0 10px;
  color: #9c9c9c7d;
  h2 {
    font-family: "Rajdhani", sans-serif;
    font-size: 1.4rem;
    transition: all .3s ease;
    &:hover {
      transform: scale(1.2);
    }
  }
  a {
    text-decoration: none;
    color: #444444;
  }
`;
const DateInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0.5rem;
`;
const Date = styled.p`
  color: #747474;
  font-size: 16px;
  letter-spacing: 1px;
  font-family: "Rajdhani", sans-serif;
`;
export default Fixtures;
