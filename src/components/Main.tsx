// Main page
import styled from "styled-components";
import { laptop, fontFamily, space } from "../style/styles";
import { motion } from "framer-motion";
import { NextBtn } from "./UI/NextBtn";
import { Line } from "./UI/Line";
import { imgUrl } from "../utill";

// Style
const Wrapper = styled.main`
  font-size: 18px;
  font-family: ${fontFamily.eng};
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Heading */
  h1 {
    font-size: 8vw;
  }
  @media (max-width: ${laptop}) {
    font-size: 16px;
  }
`;

const Content = styled(motion.div)`
  transform: translateY(-50%);
  span {
    margin-top: ${space.default};
  }
`;

const Object = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 90%;
  top: 0;
  left: 0;

  /* Next button */
  & > span {
    position: absolute;
    color: white;
    left: 50%;
    bottom: 100px;
    transform: translateX(-50%);
  }
`;

const BgImage = styled(motion.img)`
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
`;

function Main() {
  return (
    <Wrapper>
      <Content
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 4,
          delay: 2,
        }}
      >
        <h1>Portfolio</h1>
        <Line weight="bold" length="100px" margin={space.default + " 0"} />
        <span>김해린</span>
      </Content>
      <Object
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        <NextBtn goTo="about" color="white" />
      </Object>
      <BgImage
        src={imgUrl + "/wave_green.png"}
        key="wave-1"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 2,
        }}
      />
      <BgImage
        src={imgUrl + "/wave_blue.png"}
        key="wave-2"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 2,
          delay: 1,
        }}
      />
    </Wrapper>
  );
}

export default Main;
