import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import swal from "sweetalert";
import styled from "styled-components";

function Player(props) {
  const history = useHistory();
  const [details, setDetails] = useState({});
  useEffect(() => {
    let playerId = props.match.params.id;
    axios
      .get(`http://localhost:3001/api/admin/players/${playerId}`)
      .then((res) => {
        if (res.status === 201) {
          setDetails(res.data);
        } else {
          swal("error", "", "error");
          history.push("/admin/view-players");
        }
      });
  }, [props.match.params.id, history]);

  const deleteCategory = (e, playerId) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3001/api/admin/players/${playerId}`)
      .then((res) => {
        if (res.status === 201) {
          swal("Success", "", "success");
          history.push("/admin/view-players");
        } else if (res.status === 400) {
          swal("Error", "", "error");
        }
      });
  };
  return (
    <PlayerDetails>
      <h2>{details.name}</h2>
      <img src={`/uploads/${details.playerImage}`} alt="image" />
      <h2>{details.number}</h2>
      <p>{details.team}</p>
      <p>{details.age}</p>
      <p>{details.nationality}</p>
      <Buttons>
        <EditButton>
          <Link to={`/admin/edit-player/${details._id}`}>Edit</Link>
        </EditButton>
        <button onClick={(e) => deleteCategory(e, details._id)}>Delete</button>
      </Buttons>
    </PlayerDetails>
  );
}

const PlayerDetails = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    border-radius: 1rem;
    width: 30%;
  }
  h2 {
    font-size: 1.6rem;
  }
  p {
    font-size: 1rem;
  }
`;
const Buttons = styled.div`
  position: absolute;
  width: 50%;
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

export default Player;
