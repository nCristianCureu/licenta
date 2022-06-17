import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { publicRequest, userRequest } from "../../../requestMethods";

function Fixture(props) {
  const history = useHistory();
  const [match, setMatch] = useState({});
  let matchId = props.match.params.id;
  useEffect(() => {
    const getMatchById = async () => {
      try {
        const res = await publicRequest.get(`/matches/${matchId}`);
        setMatch(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMatchById();
  }, [props.match.params.id, history]);

  const deleteMatch = async (e, matchId) => {
    e.preventDefault();
    try {
      await userRequest.delete(`/matches/${matchId}`);
      history.push("/admin/view-fixtures");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Match>
        <h2>{match.opponent}</h2>
        <h3>{match.stadium}</h3>
        <DateInfo>
          <Date>{match.date}</Date>
        </DateInfo>
        <Buttons>
          <EditButton>
            <Link to={`/admin/edit-fixture/${match._id}`}>EDIT</Link>
          </EditButton>
          <AddTickets>
            <Link to={`/admin/fixtures/${match._id}/tickets`}>TICKETS</Link>
          </AddTickets>
          <button onClick={(e) => deleteMatch(e, match._id)}>DELETE</button>
        </Buttons>
      </Match>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80vh;
`;
const Match = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  border-radius: 4px;
  border: 1px solid #9c9c9c7d;
  width: 50vw;
  height: 50vh;
  padding: 2rem 4rem;
  margin: 2rem;
  box-shadow: 0 0 20px;
  color: #9c9c9c7d;
  h2 {
    color: #101010;
    margin: 2rem 0rem;
    font-family: "Rajdhani", sans-serif;
    font-size: 2rem;
  }
  h3 {
    color: #767676;
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
const Buttons = styled.div`
  width: 80%;
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: #db0000;
    background-color: white;
    border: 2px solid #db0000;
    border-radius: 2px;
    transition: all 0.3s ease;
    :hover {
      color: white;
      background-color: #db0000;
    }
  }
`;
const EditButton = styled.div`
  font-size: 0.9rem;
  border: 2px solid #00ca00;
  border-radius: 2px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: white;
  transition: all 0.3s ease;
  a {
    text-decoration: none;
    color: #00ca00;
  }
  :hover {
    background-color: #00ca00;
    a {
      color: white;
    }
  }
`;
const AddTickets = styled.div`
  font-size: 0.9rem;
  border: 2px solid #5fa8d3;
  border-radius: 2px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: white;
  transition: all 0.3s ease;
  a {
    text-decoration: none;
    color: #5fa8d3;
  }
  :hover {
    background-color: #5fa8d3;
    a {
      color: white;
    }
  }
`;

export default Fixture;
