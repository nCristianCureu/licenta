import { Send } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";

function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>
        Get timely updates from your favorite team's shop!
      </Description>
      <InputContainer>
        <Input placeholder="Type your email" />
        <Button>
          <Send style={{ transform: "scale(1.1)" }} />
        </Button>
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: #fcf5f5;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  letter-spacing: 2px;
  margin-bottom: 2rem;
`;
const Description = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d2d2d2;
  border-radius: 2px;
  overflow: hidden;
`;
const Input = styled.input`
  color: #393939;
  padding-left: 2rem;
  border: none;
  outline: none;
  flex: 9;
`;
const Button = styled.button`
  background-color: teal;
  height: 100%;
  color: white;
  flex: 1;
  border: none;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.3s ease;
    &:hover {
        color: #fffaf0;
    }
`;

export default Newsletter;
