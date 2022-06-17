import Navbar from "../../../layouts/frontend/Navbar";
import { useState } from "react";
import Loading from "../../loading/Loading";
import "./styleAuth.css";
import { login } from "../shop/redux/apiCalls";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
    // try {
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   };
    //   setLoading(true);
    //   //deconstructing data
    //   const { data } = await axios.post(
    //     "http://localhost:3001/api/user/login",
    //     {
    //       email,
    //       password,
    //     },
    //     config
    //   );
    //   localStorage.setItem("user-name", data.name);
    //   localStorage.setItem("user-token", data.token);
    // swal({
    //   title: "Success",
    //   text: "Logged in successfully!",
    //   icon: "success",
    // }).then(() => {
    //   window.location.reload();
    // });
    //   setLoading(false);
    // } catch (error) {
    //   setError(error.response.data.message);
    //   swal("Warning", error.response.data.message, "warning");
    //   setLoading(false);
    // }
  };

  return (
    <div className="Home">
      <Navbar />
      {loading && <Loading />}
      <Container>
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
            <Button type="submit">Login</Button>
          </div>
        </form>
      </Container>
    </div>
  );
};
const Container = styled.div`
  margin-top: 4rem;
`;
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
`;

export default Login;
