import styled from "styled-components";
import { motion } from "framer-motion";

function Presentation() {
  return (
    <Container>
      <Image>
        <ImageNeuer
          animate={{ x: 350, y: 10, scale: 1.16, rotateY: 0, opacity: 1 }}
          initial={{ x: 50, rotateY: 30, opacity: 0 }}
          transition={{ duration: 1.8, delay: 1 }}
          src="https://i.ibb.co/pKHH5g0/neuerPNG.png"
        />
        <Line
          animate={{ x: 350 , y: 40, opacity: 1 }}
          initial={{ x: 50, y: 40, opacity: 0 }}
          transition={{ duration: 2, delay: 2 }}
        ></Line>
      </Image>
      <Image>
        <ImageRony
          animate={{ x: -350, y: 10, scale: 1.24, rotateY: 0, opacity: 1 }}
          initial={{ x: -50, rotateY: -30, opacity: 0 }}
          transition={{ duration: 1.8, delay: 1 }}
          src="https://i.ibb.co/5nsMRT1/ronaldo-PNG.png"
        />
        <Line
          animate={{ x: -350, y: 40, opacity: 1 }}
          initial={{ x: -50, y: 40, opacity: 0 }}
          transition={{ duration: 2, delay: 2 }}
        ></Line>
      </Image>
    </Container>
  );
}

const Container = styled.div`
  min-height: 60vh;
  display: flex;
  justify-content: space-between;
  z-index: 1;
`;
const Image = styled.div`
  width: 15%;
`;
const Line = styled(motion.div)`
  width: 100%;
  height: 1.2px;
  border-radius: 50%;
  background: #ffffff4e;
  box-shadow: rgba(255, 255, 255, 0.7) 0px 5px 15px;
`;

const ImageNeuer = styled(motion.img)`
  width: 100%;
  margin: 0.5rem 0rem;
  pointer-events: none;
`;
const ImageRony = styled(motion.img)`
  width: 100%;
  margin: 0.5rem 0rem;
  pointer-events: none;
  overflow: hidden;
`;

export default Presentation;
