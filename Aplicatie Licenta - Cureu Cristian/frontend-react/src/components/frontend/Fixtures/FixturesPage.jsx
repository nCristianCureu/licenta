import { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import Fixtures from "./Fixtures";
import { lightTheme, darkTheme } from "../../../themes";
import styled, { ThemeProvider } from "styled-components";
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";

function FixturesPage() {
  //Dark Mode
  const [theme, setTheme] = useState("light");
  const themeToggle = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const icon = theme === "light" ? <HiMoon size={20} /> : <CgSun size={20} />;
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Container>
        <Navbar />
        <Toggler>
          <Toggle onClick={() => themeToggle()}>{icon}</Toggle>
        </Toggler>
        <Fixtures/>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.body};
`;
const Toggler = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;
const Toggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: none;
  &:focus {
    outline: none;
  }
  transition: all 0.5s ease;
`;
export default FixturesPage;
