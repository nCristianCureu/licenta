import React, { useState, useEffect } from "react";
import Loading from "../../loading/Loading";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import "./players.css";

function EditPlayer(props) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [number, setNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  let playerId = props.match.params.id;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(
        `http://localhost:3001/api/admin/edit-player/${playerId}`,
        {
          name: name,
          team: team,
          number: number,
          nationality: nationality,
          age: age,
        }
      );
      console.log(data);
      setLoading(false);
      swal("Player successfully updated!", "", "success");
      history.push(`/admin/players/${playerId}`);
    } catch (error) {
      setError(error.response.data.message);
      swal("Warning", error.response.data.message, "warning");
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/admin/players/${playerId}`)
      .then((res) => {
        if (res.status === 201) {
          setName(res.data.name);
          setTeam(res.data.team);
          setNumber(res.data.number);
          setNationality(res.data.nationality);
          setAge(res.data.age);
        } else {
          swal("error", "", "error");
          history.push("/admin/view-players");
        }
      });
  }, [props.match.params.id, history]);

  return (
    <div className="">
      {loading && <Loading />}
      <form
        onSubmit={submitHandler}
        encType="multipart/form-data"
        className="formAddPlayer"
        id="addPlayerForm"
      >
        <div className="form-group">
          <input
            type="text"
            autoComplete="off"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name" className="label">
            <span className="content">Name</span>
          </label>
        </div>
        <div className="form-group">
          <input
            type="text"
            autoComplete="off"
            name="team"
            required
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
          <label htmlFor="team" className="label">
            <span className="content">Team</span>
          </label>
        </div>
        <div className="form-group">
          <input
            type="number"
            autoComplete="off"
            name="number"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <label htmlFor="number" className="label">
            <span className="content">Number</span>
          </label>
        </div>
        <div className="form-group">
          <input
            type="text"
            autoComplete="off"
            name="nationality"
            required
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
          <label htmlFor="number" className="label">
            <span className="content">Nationality</span>
          </label>
        </div>
        <div className="form-group">
          <input
            type="number"
            autoComplete="off"
            name="age"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label htmlFor="number" className="label">
            <span className="content">Age</span>
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="btnAddPlayer">
            Update Player
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPlayer;
