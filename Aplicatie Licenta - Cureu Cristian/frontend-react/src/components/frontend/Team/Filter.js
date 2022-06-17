import { useEffect } from "react";
import styled from "styled-components";

function Filter({
  playerList,
  setFilteredList,
  activePosition,
  setActivePosition,
  theme,
  setTheme,
}) {
  useEffect(() => {
    if (activePosition === "All") {
      setFilteredList(playerList);
      return;
    }
    const filtered = playerList.filter((player) =>
      player.position.includes(activePosition)
    );
    setFilteredList(filtered);
  }, [activePosition]);

  return (
      <FilterContainer>
        <button
          onClick={() => setActivePosition("All")}
          className={activePosition === "All" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setActivePosition("Goalkeeper")}
          className={activePosition === "Goalkeeper" ? "active" : ""}
        >
          Goalkeepers
        </button>
        <button
          onClick={() => setActivePosition("Defender")}
          className={activePosition === "Defender" ? "active" : ""}
        >
          Defenders
        </button>
        <button
          onClick={() => setActivePosition("Midfielder")}
          className={activePosition === "Midfielder" ? "active" : ""}
        >
          Midfielders
        </button>
        <button
          onClick={() => setActivePosition("Forward")}
          className={activePosition === "Forward" ? "active" : ""}
        >
          Forwards
        </button>
      </FilterContainer>
  );
}

const FilterContainer = styled.div`
  margin: 2% 0%;
  padding-left: 2rem;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
  button {
    margin-right: 2rem;
    min-width: 5rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: ${(props) => props.theme.body};
    color: rgb(65, 98, 168);
    border-radius: 1rem;
    border: 2px solid rgb(65, 98, 168);
    font-weight: bold;
    transition: transform 0.4s ease;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
      transition: transform 0.4s ease;
    }
  }
  .active {
    background: rgb(65, 98, 168);
    color: white;
  }
`;

export default Filter;
