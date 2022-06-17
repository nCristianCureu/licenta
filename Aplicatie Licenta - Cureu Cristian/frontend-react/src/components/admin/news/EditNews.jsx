import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../loading/Loading";
import axios from "axios";
import swal from "sweetalert";

const EditNews = (props) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  let newsId = props.match.params.id;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:3001/api/edit-news/${newsId}`,
        {
          title: title,
          description: description,
          newsPhoto: picture,
          date: date,
        }
      );
      console.log(res);
      setLoading(false);
      swal("News successfully updated!", "", "success");
    } catch (error) {
      setError(error.response.data.message);
      swal("Warning", error.response.data.message, "warning");
      setLoading(false);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/api/news/${newsId}`).then((res) => {
      if (res.status === 201) {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setPicture(res.data.newsPhoto);
        setDate(res.data.date);
      } else {
        swal("error", "", "error");
        history.push("/admin/view-news");
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
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="title" className="label">
            <span className="content">Title</span>
          </label>
        </div>
        <div className="form-group textareaDiv">
          <label htmlFor="description">
            <span>Description</span>
          </label>
          <textarea
            className="textarea"
            type="text"
            autoComplete="off"
            name="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            autoComplete="off"
            name="picture"
            required
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
          <label htmlFor="picture" className="label">
            <span className="content">News Photo</span>
          </label>
        </div>
        <div className="form-group">
          <input
            type="text"
            autoComplete="off"
            name="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label htmlFor="date" className="label">
            <span className="content">Date</span>
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="btnAddPlayer">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNews;
