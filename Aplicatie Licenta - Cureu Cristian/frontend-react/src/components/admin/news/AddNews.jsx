import React, { useState } from "react";
import Loading from "../../loading/Loading";
import axios from "axios";
import swal from "sweetalert";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:3001/api/add-news", {
        title: title,
        description: description,
        newsPhoto: picture,
      });
      console.log(data);
      setLoading(false);
      swal("News successfully added!", "", "success");
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
            <span className="content">News Photo - URL</span>
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

export default AddNews;
