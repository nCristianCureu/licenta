import React, { useState } from "react";
import Loading from "../../loading/Loading";
import axios from "axios";
import swal from "sweetalert";
import "./players.css";

const AddPlayer = () => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [number, setNumber] = useState("");
  const [position, setPosition] = useState("");
  const [nationality, setNationality] = useState("");
  const [age, setAge] = useState("");
  const [picture, setPicture] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeImage = (e) => {
    setPicture(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("team", team);
    formData.append("number", number);
    formData.append("position", position);
    formData.append("nationality", nationality);
    formData.append("age", age);
    formData.append("playerImage", picture);
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:3001/api/admin/add-player",
        formData,
      );
      swal("Player successfully added!", "", "success");
      setLoading(false);
      // setName("")
    }
    catch (error) {
      setError(error.response.data.message);
      swal("Warning", error.response.data.message, "warning");
      setLoading(false);
    }
  };

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
            name="position"
            required
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <label htmlFor="name" className="label">
            <span className="content">Position</span>
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
        <div className="form-group formImage">
          <input
            type="file"
            filename="playerImage"
            required
            onChange={onChangeImage}
          />
          <label htmlFor="picture" className="label image">
            <span className="content">Image</span>
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="btnAddPlayer">
            Add Player
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlayer;
