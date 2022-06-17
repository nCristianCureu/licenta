import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Sidebar = () => {
  return (
    <div className="side-nav-and-footer">
    <nav className="side-nav">
      <ul className="side-nav-list">
        <li className="li"><Link to="/admin/dashboard">Dashboard</Link></li>
        <li className="dropdown li"><Link to="#">News</Link>
          <ul>
            <li className="dropdown-item"><Link to="/admin/view-news">All news</Link></li>
            <li className="dropdown-item"><Link to="/admin/add-news">Add news</Link></li>
          </ul>
        </li>
        <li className="dropdown li"><Link to="#">Team</Link>
          <ul>
            <li className="dropdown-item"><Link to="/admin/view-players">All players</Link></li>
            <li className="dropdown-item"><Link to="/admin/add-player">Add player</Link></li>
          </ul>
        </li>
        <li className="dropdown li"><Link to="#">Fixtures</Link>
          <ul>
            <li className="dropdown-item"><Link to="/admin/view-fixtures">All fixtures</Link></li>
            <li className="dropdown-item"><Link to="/admin/add-fixtures">Add match</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
      <div className="footer">
        <h3>Logged in as:</h3>
        <p>{localStorage.getItem("user-name")}</p>
      </div>
    </div>
  );
};

export default Sidebar;
