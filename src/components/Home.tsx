import styled from "styled-components";
import { laptop, fontFamily, tablet } from "../style/styles";
import Main from "./Main";
import About from "./About";
import Project from "./Project";
import Contact from "./Contact";

// Style
const Wrapper = styled.div`
  font-size: 18px;
  font-family: ${fontFamily.eng};
  width: 100%;
  height: auto;

  @media (max-width: ${laptop}) {
    font-size: 16px;
  }
  @media (max-width: ${tablet}) {
    font-size: 14px;
  }
`;

const GradientBox = styled.div`
  background: linear-gradient(180deg, rgb(7, 185, 203), rgba(255, 255, 255, 0));
  height: 30vh;
  width: 100%;
`;

function Home() {
  return (
    <Wrapper>
      <Main />
      <GradientBox />
      <About />
      <Project />
      <Contact />
    </Wrapper>
  );
}

export default Home;
