import styled from "styled-components";
import { motion } from "framer-motion";

function Background() {
  let ball = require("./assets/ball.png");
  let image = require("./assets/bg.jpg");
  return (
    <Container>
      <Image src={image}></Image>
      <Text
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <H1
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{duration: 1, delay: 0.6 }}
        >
          WELCOME TO FANTASY TEAM
        </H1>
        <H2
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{duration: 1.2, delay: 0.9 }}
        >
          OFFICIAL WEBSITE
        </H2>
      </Text>
      <BallShadow>
        <Ball
          src={ball}
          animate={{
            y: [
              -130, -150, 0, -100, 0, -80, 0, -60, 0, -30, 0, -10, 0, -5, 0, -3,
              0, -1, 0,
            ],
          }}
          transition={{ duration: 8, ease: "easeInOut", delay: 0.2 }}
        ></Ball>
        <Shadow
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
        ></Shadow>
      </BallShadow>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  bottom: 35rem;
  background: #e6e6e6;
  width: 100%;
  height: 110vh;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled(motion.img)`
  width: 100%;
`;
const Text = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  position: absolute;
  top: 10%;
  border-left: 6px solid white;
  border-right: 6px solid white;
  border-top: 6px solid white;
  border-bottom: 2px solid white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  width: 60vw;
  height: 40vh;
`;
const H1 = styled(motion.h1)`
  color: white;
  letter-spacing: 1.5px;
  font-size: 2.2rem;
  margin: 1rem 0rem;
  font-weight: 500;
  font-family: 'Rajdhani', sans-serif;
`;
const H2 = styled(motion.h2)`
  color: white;
  letter-spacing: 2px;
  font-size: 1.4rem;
  font-weight: 300;
  font-family: 'Rajdhani', sans-serif;
`;

const BallShadow = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 150px;
  height: 200px;
  position: absolute;
`;
const Ball = styled(motion.img)`
  max-width: 110px;
  border-radius: 100%;
`;
const Shadow = styled(motion.div)`
  width: 100px;
  height: 2px;
  background-color: #00000075;
  border-radius: 50%;
  padding: 0.25rem 0rem;
  box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px;
`;

export default Background;
