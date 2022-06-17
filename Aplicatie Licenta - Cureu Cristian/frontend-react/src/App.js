import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Team from "./components/frontend/Team/Team";
import Home from "./components/frontend/Home/Home";
import News from "./components/frontend/News/News";
import Register from "./components/frontend/auth/Register";
import Login from "./components/frontend/auth/Login";
import LoginFromShop from "./components/frontend/auth/LoginFromShop";
import MasterLayout from "./layouts/admin/MasterLayout";
import ShopHomePage from "./components/frontend/shop/pages/ShopHomePage";
import ProductListPage from "./components/frontend/shop/pages/ProductListPage";
import ProductPage from "./components/frontend/shop/pages/ProductPage";
import CartPage from "./components/frontend/shop/pages/CartPage";
import Success from "./components/frontend/shop/pages/Success";
import jwt_decode from "jwt-decode";
import FixturesPage from "./components/frontend/Fixtures/FixturesPage";
import Tickets from "./components/frontend/Fixtures/Tickets";
import LocationPage from "./components/frontend/Location/LocationPage";
import SoloNews from "./components/frontend/News/SoloNews";

function App() {
  let admin = false;
  if (localStorage.getItem("user-token")) {
    if (jwt_decode(localStorage.getItem("user-token")).isAdmin) {
      admin = !admin;
    }
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login">
            {localStorage.getItem("user-token") ? (
              <Redirect to="/" />
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/register">
            {localStorage.getItem("user-token") ? (
              <Redirect to="/" />
            ) : (
              <Register />
            )}
          </Route>
          <Route path="/team" component={Team} />
          <Route exact path="/news" component={News} />
          <Route path="/news/:id" component={SoloNews} />
          <Route path="/location" component={LocationPage} />
          <Route exact path="/fixtures" component={FixturesPage} />
          <Route path="/tickets/:id" component={Tickets} />
          <Route exact path="/shop">
            {localStorage.getItem("user-token") ? (
              <ShopHomePage />
            ) : (
              <LoginFromShop />
            )}
          </Route>
          <Route path="/shop/products/:category" component={ProductListPage} />
          <Route path="/shop/product/:id" component={ProductPage} />
          <Route path="/shop/cart" component={CartPage} />
          <Route path="/success" component={Success} />
          {admin && (
            <Route
              path="/admin"
              name={"Admin"}
              render={(props) => <MasterLayout {...props} />}
            ></Route>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
