import React from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Loading from "../../loading/Loading";
import "./styleAuth.css";
import styled from "styled-components";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage(`Password don't match!`);
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "http://localhost:3001/api/user/register",
          {
            name,
            email,
            password,
          },
          config
        );
        swal("Success", "Registration successfully!", "success");
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        swal("Warning", error.response.data.message, "warning");
        setLoading(false);
      }
    }
  };

  return (
    <div className="Home">
      <Navbar />
      {loading && <Loading />}
      <form onSubmit={submitHandler}>
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
          <input
            type="password"
            autoComplete="off"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword" className="label">
            <span className="content">Confirm Password</span>
          </label>
        </div>
        <div className="form-group">
          <Button type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
};

const Button = styled.button`
  font-size: 14px;
  padding: 0rem 1.5rem;
  border: 2px solid #5fa8d3;
  border-radius: 2px;
  color: #5fa8d3;
  background-color: white;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all .4s ease;
  &:hover {
    color: white;
    background-color: #5fa8d3;
  }
`

export default Register;
