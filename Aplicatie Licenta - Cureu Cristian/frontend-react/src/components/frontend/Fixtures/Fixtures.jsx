import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../../../requestMethods";

function Fixtures() {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    const getAllFixtures = async () => {
      try {
        const res = await publicRequest.get("/matches");
        setFixtures(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllFixtures();
  });
  return (
    <Container>
      {fixtures.map((item) => (
        <Fixture key={item._id}>
          <h2>{item.opponent} - Fantasy Team</h2>
          <h3>{item.stadium}</h3>
          <DateInfo>
            <Date>{item.date.substring(0, 10)}</Date>
            <Date>{item.date.substring(11, 16)}</Date>
          </DateInfo>
          <Link to={`/tickets/${item._id}`} params={{ testvalue: "hello" }}>
            <Button>BUY TICKETS</Button>
          </Link>
        </Fixture>
      ))}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  min-height: 90vh;
`;
const Fixture = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  border-radius: 4px;
  border: 1px solid #7272727f;
  width: 50vw;
  height: 35vh;
  padding: 2rem 4rem;
  margin: 2rem;
  box-shadow: 0 0 15px;
  color: ${(props) => props.theme.boxShadow};
  h2 {
    color: ${(props) => props.theme.fixturesH2};
    margin: 2rem 0rem;
    font-family: "Rajdhani", sans-serif;
    font-size: 2rem;
  }
  h3 {
    color: ${(props) => props.theme.fixturesH2};
    margin-bottom: 3rem;
    font-family: "Rajdhani", sans-serif;
    font-weight: 400;
    text-transform: uppercase;
  }
`;
const DateInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  margin: 1rem;
`;
const Date = styled.p`
  color: #747474;
  font-size: 16px;
  letter-spacing: 1px;
  font-family: "Rajdhani", sans-serif;
`;
const Button = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 2px solid #424242;
  border-radius: 2px;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.fixturesButtonColor};
  transition: all 0.4s ease;
  &:hover {
    color: white;
    background-color: #424242;
    transition: all 0.4s ease;
  }
`;
export default Fixtures;
