import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Mic, SearchOutlined } from "@material-ui/icons";
import Loading from "../../loading/Loading";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../../themes";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../../layouts/frontend/Navbar";
import Filter from "./Filter";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";

const Team = () => {
  const [playersList, setPlayersList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [activePosition, setActivePosition] = useState("All");
  const [searchedPlayer, setSearchedPlayer] = useState("");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  //Dark Mode
  const themeToggle = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const icon = theme === "light" ? <HiMoon size={20} /> : <CgSun size={20} />;
  useEffect(() => {
    axios.get("http://localhost:3001/api/admin/view-players").then((res) => {
      if (res.status === 201) {
        setPlayersList(res.data);
        setFilteredList(res.data);
      }
      setLoading(false);
    });
  }, []);

  //Voice Recognizer
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const submitMicrophone = () => {
    SpeechRecognition.stopListening();
    const filtered = playersList.filter((player) =>
      player.name.includes(transcript)
    );
    setFilteredList(filtered);
    resetTranscript();
  };
  //Search for one player
  const submitHandler = (e) => {
    e.preventDefault();
    const filtered = playersList.filter((player) =>
      player.name.includes(
        searchedPlayer.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
          letter.toUpperCase()
        )
      )
    );
    setFilteredList(filtered);
  };
  let viewPlayersTable = "";
  if (loading) {
    return <Loading />;
  } else {
    viewPlayersTable = filteredList
      .sort((a, b) => a.number - b.number)
      .map((player) => {
        return (
          <PlayerInfo
            key={player._id}
            layout
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <AnimatePresence>
              <Image>
                <img src={`/uploads/${player.playerImage}`} alt="image" />
                <h2>{player.number}</h2>
              </Image>
              <h3>{player.name}</h3>
              <h4>{player.team}</h4>
              <h5>{player.position}</h5>
              <h6>{player.nationality}</h6>
            </AnimatePresence>
          </PlayerInfo>
        );
      });
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Page>
        <Navbar />
        <Toggler>
          <Toggle onClick={() => themeToggle()}>{icon}</Toggle>
        </Toggler>
        <Top>
          <Filter
            playerList={playersList}
            setFilteredList={setFilteredList}
            activePosition={activePosition}
            setActivePosition={setActivePosition}
            theme={theme}
            setTheme={setTheme}
          />
          <SearchBar>
            <FormDiv>
              <form onSubmit={submitHandler}>
                <Input
                  placeholder="Search"
                  value={searchedPlayer}
                  onChange={(e) => setSearchedPlayer(e.target.value)}
                />
                <button type="submit">
                  <SearchOutlined
                    style={{
                      cursor: "pointer",
                      transform: "scale(1.2)",
                      color: "gray",
                    }}
                  />
                </button>
              </form>
            </FormDiv>
            <MicAndInfo>
              <Microphone
                className={listening ? "active" : ""}
                onMouseDown={SpeechRecognition.startListening}
                onTouchStart={SpeechRecognition.startListening}
                onTouchEnd={submitMicrophone}
                onMouseUp={submitMicrophone}
              >
                <Mic
                  style={{
                    color: "#0083da",
                    transform: "scale(1.1)",
                  }}
                />
              </Microphone>
              <p>HOLD TO TALK</p>
            </MicAndInfo>
          </SearchBar>
        </Top>
        <AllPlayers layout>{viewPlayersTable}</AllPlayers>
      </Page>
    </ThemeProvider>
  );
};
const Page = styled.div`
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.body};
  min-height: 100vh;
`;
const MicAndInfo = styled.div`
  position: relative;
  p {
    position: absolute;
    font-size: 10px;
    font-family: "Rajdhani", sans-serif;
    font-weight: 500;
    width: 80px;
    height: 50%;
    letter-spacing: 1px;
    left: 50%;
    transform: translate(-50%, 50%);
    text-align: center;
    color: ${(props) => props.theme.teamFont};
  }
`;
const Microphone = styled.div`
  color: ${(props) => props.theme.teamFont};
  box-shadow: 0 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    transition: all 0.5s ease;
    transform: scale(1.1);
  }
  &:active {
    box-shadow: 0 0 10px;
    color: #ff0000;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 14vh;
`;
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex: 1;
`;
const FormDiv = styled.div`
  border-bottom: 2px solid gray;
  position: relative;
  padding: 4px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    margin-right: 8px;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 50%;
    background-color: ${(props) => props.theme.body};
    position: absolute;
    transition: transform 0.3s ease;
    right: 0;
    &:hover {
      transform: scale(1.15);
      transition: transform 0.3s ease;
    }
    &:active {
      color: ${(props) => props.theme.searchColor};
      box-shadow: 0 0 0 6px;
      transition: all 0.1s ease;
    }
  }
`;
const Input = styled.input`
  border: none;
  padding: 6px 4px;
  outline: none;
  letter-spacing: 1px;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.teamFont};
`;
const AllPlayers = styled(motion.div)`
  width: 80%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
`;

const Image = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  h2 {
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem 1.5rem;
    position: absolute;
    bottom: 0;
    width: 40px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
  }
`;

const PlayerInfo = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0rem;
  color: ${(props) => props.theme.teamFont};
  img {
    padding-top: 1rem;
    width: 250px;
    cursor: pointer;
    transition: transform 1s ease;
  }
  img:hover {
    transform: scale(1.1);
  }
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

export default Team;
