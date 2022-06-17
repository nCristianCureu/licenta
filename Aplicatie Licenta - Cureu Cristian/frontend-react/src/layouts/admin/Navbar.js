import React from "react";
import { Link, useHistory } from "react-router-dom";
import { HomeOutlined } from "@material-ui/icons";
import swal from "sweetalert";
import "./style.css";

const Navbar = () => {
  const history = useHistory();
  return (
    <nav className="nav-admin">
      <div className="title">
        <h1>Admin Panel</h1>
      </div>
      <ul className="nav-items-admin">
        <li >
          <Link to="/">
            <HomeOutlined className="nav-icon"/>
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("user-name");
              localStorage.removeItem("user-token");
              swal("Logged out!", "", "success");
              history.push("/");
            }}
            className="logout"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
