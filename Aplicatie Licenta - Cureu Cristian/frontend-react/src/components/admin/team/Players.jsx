import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../loading/Loading";
import styled from "styled-components";

const Players = () => {
  const [playersList, setPlayersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/api/admin/view-players").then((res) => {
      if (res.status === 201) {
        setPlayersList(res.data);
      }
      setLoading(false);
    });
  }, []);

  let viewPlayersTable = "";
  if (loading) {
    return <Loading />;
  } else {
    viewPlayersTable = playersList
      .sort((a, b) => a.number - b.number)
      .map((player) => {
        return (
          <PlayerInfo key={player._id}>
            <Link to={"/admin/players/" + player._id}>
              <Image>
                <img src={`/uploads/${player.playerImage}`} alt="image" />
                <h2>{player.number}</h2>
              </Image>
            </Link>
            <h3>{player.name}</h3>
            <h2>{player.number}</h2>
          </PlayerInfo>
        );
      });
  }

  return (
    <Container>
      <h2>All players</h2>
      <AllPlayers>{viewPlayersTable}</AllPlayers>
    </Container>
  );
};
const Container = styled.div`
  align-items: center;
  flex-direction: column;
  width: 100%;
  display: flex;
`;
const AllPlayers = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 0.5rem;
`;
const Image = styled.div`
  position: relative;
  border-radius: 1rem;
  display: flex;
  overflow: hidden;
  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem 1.5rem;
    position: absolute;
    bottom: 0;
    width: 40px;
    border-radius: 0rem 0.1rem 0rem 1rem;
    background: rgba(0, 0, 0, 0.6);
    color: white;
  }
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0rem;
  img {
    width: 250px;
    cursor: pointer;
    transition: transform 1s ease;
    border-radius: 1rem;
  }
  img:hover {
    transform: scale(1.1);
  }
  a {
    text-decoration: none;
  }
`;

export default Players;
