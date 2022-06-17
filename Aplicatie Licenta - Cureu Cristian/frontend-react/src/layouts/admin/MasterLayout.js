import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import routes from "../../routes/routes";
import { Switch, Route, Redirect } from "react-router-dom";
import "./style.css"

const MasterLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="sidePlusContent">
      <Sidebar />
      <div className="admin-content">
        <main>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => <route.component {...props} />}
                  />
                )
              );
            })}
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
        </main>
      </div>
      </div>
    </div>
  );
};

export default MasterLayout;
