import { useState } from "react";
import Loading from "../../loading/Loading";
import swal from "sweetalert";
import { userRequest } from "../../../requestMethods";
import { useHistory } from "react-router-dom";

const AddFixtures = () => {
  const history = useHistory();
  const [opponent, setOpponent] = useState("");
  const [stadium, setStadium] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("opponent", opponent);
    formData.append("stadium", stadium);
    formData.append("date", date);
    try {
      setLoading(true);
      await userRequest.post("/matches", {
        opponent: opponent,
        stadium: stadium,
        date: date,
      });
      setLoading(false);
      swal("Match successfully added!", "", "success");
      history.push("/admin/view-fixtures");
    } catch (error) {
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
            name="opponent"
            required
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
          />
          <label htmlFor="opponent" className="label">
            <span className="content">Opponent</span>
          </label>
        </div>
        <div className="form-group">
          <input
            type="text"
            autoComplete="off"
            name="stadium"
            required
            value={stadium}
            onChange={(e) => setStadium(e.target.value)}
          />
          <label htmlFor="stadium" className="label">
            <span className="content">Stadium</span>
          </label>
        </div>
        <div className="form-group formImage">
          <input
            type="date"
            name="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label htmlFor="picture" className="label">
            <span className="content">Date</span>
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="btnAddPlayer">
            Add News
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFixtures;
