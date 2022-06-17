import { Link } from "react-router-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import {
  logout,
  removeCartItems,
} from "../../components/frontend/shop/redux/apiCalls";

const Navbar = () => {
  const dispatch = useDispatch();
  let AuthButtons = "";
  let PanelButton = "";
  let admin = false;
  if (localStorage.getItem("user-token")) {
    if (jwt_decode(localStorage.getItem("user-token")).isAdmin) {
      admin = !admin;
    }
  }
  if (admin) {
    PanelButton = (
      <ul>
        <Li>
          <Link to="/admin">Panel</Link>
        </Li>
      </ul>
    );
  }
  if (!localStorage.getItem("user-token")) {
    AuthButtons = (
      <ul>
        <LoginRegister>
          <Link aria-current="page" to="/login">
            Login
          </Link>
        </LoginRegister>
        <LoginRegister>
          <Link aria-current="page" to="/register">
            Register
          </Link>
        </LoginRegister>
      </ul>
    );
  } else {
    AuthButtons = (
      <ul>
        <li>
          <LogoutButton
            type="button"
            onClick={() => {
              logout(dispatch);
              removeCartItems(dispatch);
            }}
          >
            Logout
          </LogoutButton>
        </li>
      </ul>
    );
  }
  return (
    <NavContainer>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo>
              <ImageLogo>
                <img src="https://i.ibb.co/F7X5TYF/logo-Perfect.png" />
              </ImageLogo>
              <Line></Line>
              <h2>Fantasy Team</h2>
            </Logo>
          </Link>
        </Left>
        <Center>
          <ul>
            <li>
              <Link aria-current="page" to="/news">
                News
              </Link>
            </li>
            <li>
              <Link aria-current="page" to="/team">
                Team
              </Link>
            </li>

            <li>
              <Link aria-current="page" to="/shop">
                Shop
              </Link>
            </li>
            <li>
              <Link aria-current="page" to="/fixtures">
                Fixtures & Tickets
              </Link>
            </li>
            <li>
              <Link aria-current="page" to="/location">
                Location
              </Link>
            </li>
          </ul>
        </Center>
        <Right>
          {PanelButton}
          {AuthButtons}
        </Right>
      </Wrapper>
    </NavContainer>
  );
};
const NavbarAnimation = keyframes`
    0%{background-position:0% 33%}
    50%{background-position:100% 68%}
    100%{background-position:0% 33%}
`;
const NavContainer = styled.nav`
  min-height: 10vh;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(
    200deg,
    #00ff9c,
    #ae00ff,
    #ffb700,
    #d000ff,
    #00ff9c
  );
  background-size: 1400% 1400%;
  animation: ${NavbarAnimation} 200s ease infinite;
`;

const Wrapper = styled.div`
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  li {
    list-style: none;
  }
  a {
    color: white;
    text-decoration: none;
  }
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
`;
const ImageLogo = styled.div`
  width: 25px;
  img {
    width: 100%;
  }
`;
const Line = styled.div`
  width: 2px;
  height: 30px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  margin: 0px 12px;
`;
const Left = styled.div`
  flex: 1; // <=> width: 33,3%; 1/3 from parent element Wrapper
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 3px;
  h2 {
    color: rgba(0, 0, 0, 0.9);
  }
`;
const Center = styled.div`
  flex: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  ul li a,
  ul li a::after,
  ul li a:hover {
    transition: all 0.4s;
  }
  ul li a:hover {
    color: rgba(255, 255, 255, 0.8);
  }
  ul {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  ul li a {
    position: relative;
    padding-bottom: 10px;
  }
  ul li a::after {
    position: absolute;
    border-radius: 1rem;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 0%;
    content: ".";
    color: transparent;
    background: rgba(255, 255, 255, 0.9);
    height: 1.5px;
  }
  ul li a:hover::after {
    width: 100%;
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ul {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
`;

const LoginRegister = styled.li`
  letter-spacing: 1px;
  font-size: 14px;
  margin: 0rem 2rem;
  color: white;
  border: 2px solid white;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: rgb(255, 255, 255);
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const LogoutButton = styled.button`
  margin: 0rem 2rem;
  letter-spacing: 1px;
  border: 2px solid white;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: rgb(255, 255, 255);
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
const Li = styled.li`
  a {
    transition: all 0.2s ease;
    &:hover {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;
export default Navbar;
