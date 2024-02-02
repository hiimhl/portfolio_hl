// Project page
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  fontSize,
  pointColor,
  space,
  mobile,
  laptop,
  tablet,
  fontFamily,
  tabletL,
} from "../style/styles";
import data from "../data/data.json";
import ProjectItem from "./ProjectItem";
import { IProject } from "../data/data_type";
import ProjectModal from "./ProjectModal";
// import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { SliderBtn } from "./UI/SliderBtn";
import { useRecoilState } from "recoil";
import { modalState, modalToggleState } from "../data/atom";

// Style
const Wrapper = styled.section`
  font-size: 16px;
  font-family: ${fontFamily.eng};
  width: 100%;
  height: 100vh;
  background: ${(p) => p.theme.gradient};
  display: relative;

  & > div {
    padding-top: 7vh;
    width: 90%;
    max-width: 1440px;
    height: 90vh;
    margin: auto;

    h1 {
      font-size: ${fontSize.large};
      font-weight: 600;
      margin: ${space.medium};
      margin-top: ${space.large};
    }
  }

  @media (max-width: ${tablet}) {
    font-size: 14px;
  }
  @media (max-width: ${mobile}) {
    height: 120vh;
    max-height: 870px;
  }
`;

const Card = styled(motion.div)<{ btncolor: string }>`
  background-color: ${(p) => p.theme.cardColor};
  margin-top: ${space.xlarge};
  width: 100%;
  height: 80%;
  margin: auto;
  padding: ${space.medium};
  border-radius: ${space.medium};
  -webkit-box-shadow: ${(p) => p.theme.boxShadow};
  box-shadow: ${(p) => p.theme.boxShadow};
  position: relative;

  #css {
    color: ${(p) => (p.btncolor === "css" ? pointColor.orange : p.theme.gray)};
  }
  #react {
    color: ${(p) =>
      p.btncolor === "react" ? pointColor.orange : p.theme.gray};
  }

  /* Filter buttons */
  & > div {
    text-align: right;
    width: auto;
    height: auto;
    margin: ${space.small};
    button {
      font-size: ${fontSize.default};
      margin-right: ${space.small};
      color: ${(p) => p.theme.gray};
    }
  }
  section {
    height: 100%;
    /* Prev, Next Button */
    button {
      position: absolute;
      top: 51%;
    }
    button:first-child {
      transform: translateX(-0.5em);
    }
    button:last-child {
      right: 0.25em;
    }
  }

  /* project list */
  section > ul {
    margin-top: ${space.default};
    height: 90%;
    padding: ${space.medium} ${space.large};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${space.large};
  }

  @media (max-width: ${laptop}) {
    height: 67%;
    min-height: 550px;
    /* Filter buttons */
    & > div {
      font-size: ${fontSize.small};
    }
  }
  @media (max-width: ${tabletL}) {
    height: 85%;
    section > button {
      top: 48%;
    }
    /* project list */
    section > ul {
      height: 90%;
      grid-template-columns: repeat(2, 1fr);
    }

    /* Filter buttons */
    & > div {
      font-size: ${fontSize.mobileTitle};
    }
  }
  @media (max-width: ${tablet}) {
    /* project list */
    section > ul {
      display: flex;
    }
  }

  @media (max-width: ${mobile}) {
    height: 90vh;
    max-height: 680px;
    /* project list */
    section > ul {
      height: auto;
      display: flex;
    }
    /* Filter buttons */
    & > div {
      font-size: ${fontSize.default};
    }

    /* project list */
    section > ul {
      height: 85%;
      width: 100%;
    }
  }
`;

const projects = data.projects;

function Project() {
  const [isReact, setIsReact] = useState("");
  const [grid, setGrid] = useState(3);
  const [cardNum, setCardNum] = useState(0);
  const [filteredData, setFilteredData] = useState<IProject[]>([]);
  const [openModal, setOpenModal] = useRecoilState(modalToggleState);
  const [modalData, setModalData] = useRecoilState(modalState);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // setScrollY(window.scrollY);
      const newScroll = 500 + window.scrollY;
      setScrollY(newScroll);
      console.log(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onTypeBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    isReact === id ? setIsReact("") : setIsReact(id);
  };

  // Editing Grid for Moblie and Tablet
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 768) {
        setGrid(1);
      } else if (width <= 1050) {
        setGrid(2);
      } else {
        setGrid(3);
      }
    };

    handleResize(); // 초기 실행

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Filter button + Set and Slice Card data
  useEffect(() => {
    if (isReact !== "") {
      const filter = projects
        .filter((item) => item.type === isReact)
        .slice(0, grid);
      return setFilteredData(filter);
    } else {
      //Setting the page list
      const slice = projects.slice(cardNum, grid + cardNum);
      return setFilteredData(slice);
    }
  }, [isReact, cardNum, grid]);

  const onProjectClick = (id: string) => {
    setModalData(id);
    setOpenModal(true);
  };

  const onPrev = () => setCardNum((prev) => (prev === 0 ? 0 : prev - 1));
  const onNext = () => {
    if (grid + cardNum + 1 === projects.length) {
      return setCardNum(0);
    } else {
      return setCardNum((prev) => prev + 1);
    }
  };

  return (
    <Wrapper id="project">
      {openModal && <ProjectModal />}
      <div>
        <h1>Projects</h1>
        <Card btncolor={isReact}>
          <div>
            <button id="react" onClick={onTypeBtn}>
              React
            </button>
            <button id="css" onClick={onTypeBtn}>
              HTML/CSS
            </button>
          </div>
          <section>
            <SliderBtn isLeft={true} onClick={onPrev} />
            <ul>
              {filteredData.map((item, index) => (
                <ProjectItem
                  item={item}
                  key={"project" + index}
                  index={index}
                  goDetail={() => onProjectClick(item.id)}
                />
              ))}
            </ul>
            <SliderBtn isLeft={false} onClick={onNext} />
          </section>

          {/* {openModal && <ProjectModal />} */}
        </Card>
      </div>
    </Wrapper>
  );
}

export default Project;
