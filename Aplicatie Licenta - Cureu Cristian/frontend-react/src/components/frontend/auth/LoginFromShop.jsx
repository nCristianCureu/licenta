import Navbar from "../../../layouts/frontend/Navbar";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import styled from "styled-components";
import Loading from "../../loading/Loading";
import "./styleAuth.css";
import { useHistory } from "react-router-dom";

const LoginFromShop = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      //deconstructing data
      const { data } = await axios.post(
        "http://localhost:3001/api/user/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("user-name", data.name);
      localStorage.setItem("user-token", data.token);
      swal({
        title: "Success",
        text: "Logged in successfully!",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      swal("Warning", error.response.data.message, "warning");
      setLoading(false);
    }
  };

  return (
    <div className="Home">
      <Navbar />
      {loading && <Loading />}
      <Message>
        <h2>You must authenticate to access the shop!</h2>
      </Message>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="email"
            autoComplete="off"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="label">
            <span className="content">Email</span>
          </label>
        </div>
        <div className="form-group">
          <input
            type="password"
            autoComplete="off"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password" className="label">
            <span className="content">Password</span>
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

const Message = styled.div`
  text-align: center;
  margin: 3rem 0rem;
  color: #c90000;
`;

export default LoginFromShop;
