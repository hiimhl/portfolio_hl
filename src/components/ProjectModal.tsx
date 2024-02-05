// Modal for item card in project list

import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Line } from "./UI/Line";
import data from "../data/data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  fontFamily,
  fontSize,
  mobile,
  pointColor,
  space,
  tablet,
} from "../style/styles";
import { AnimatePresence, motion } from "framer-motion";
import { SliderBtn } from "./UI/SliderBtn";
import { imgUrl } from "../utill";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalState, modalToggleState } from "../data/atom";
import { IProject } from "../data/data_type";

// Style
const Overlay = styled.article`
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100%;
  z-index: 100;
`;

const Wrap = styled.article`
  width: 95vw;
  height: 85%;
  margin: auto;
  position: fixed;
  border-radius: ${space.micro};
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(p) => p.theme.backgroundColor};
  display: inline-block;
  font-size: ${fontSize.default};
  font-family: ${fontFamily.kor};
`;

const Card = styled.div`
  margin: auto;
  width: 90%;
  height: 95%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${tablet}) {
    width: 100%;
  }
`;

const ImgBox = styled.div`
  width: 100%;
  max-width: 1440px;
  overflow: hidden;
  margin: auto;
  padding-top: ${space.large};

  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  button {
    margin: ${space.large};
  }

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${tablet}) {
    position: relative;

    /* Slider Buttons */
    button {
      position: absolute;
      margin: 0;
    }
    button:last-child {
      right: 0;
    }
  }
`;

const Content = styled.div`
  margin: 3% 5%;

  h4 {
    font-weight: 600;
    font-size: ${fontSize.mobileTitle};
    margin-bottom: ${space.micro};
    letter-spacing: 1.5px;
  }
  span {
    color: ${(p) => p.theme.gray};
  }

  p {
    line-height: 1.3;
    margin-top: ${space.large};
    white-space: pre-line;
  }

  @media (max-width: ${tablet}) {
    padding: ${space.medium};
    h4 {
      font-size: ${fontSize.mobileTitle};
    }
    span {
      font-size: ${fontSize.default};
    }
    p {
      font-size: ${fontSize.medium};
    }
  }
`;
const LinkBox = styled.nav`
  margin: ${space.default} 0;

  h5 {
    display: inline-block;
    margin-right: ${space.small};
  }
  a {
    margin-right: ${space.small};
    transition: background-color 0.3s ease;
    border: 1px solid ${(p) => p.theme.gray};
    padding: 1px 4px;
    border-radius: 3px;
    background-color: ${(p) => p.theme.btnColor};
  }
  a:hover {
    background-color: ${pointColor.blue};
  }
`;

const XBtn = styled.button`
  font-size: ${fontSize.medium};
  color: ${pointColor.red};
  margin: ${space.micro};
  float: right;
  z-index: 100;

  @media (max-width: ${tablet}) {
    font-size: ${fontSize.large};
    position: absolute;
    right: 0;
  }
`;

const Error = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  button {
    font-size: ${fontSize.large};
  }
`;

function ProjectModal() {
  const [img, setImg] = useState(0);
  const [isPrev, setIsPrev] = useState(false);
  const [modalId, setModalId] = useRecoilState(modalState);
  const setIsOpen = useSetRecoilState(modalToggleState);
  const [projectData, setProjectData] = useState<IProject | null>(null);
  const theme = useTheme();

  const onToggleModal = () => {
    setModalId("diary");
    setIsOpen(false);
  };

  const onPrev = () => {
    setIsPrev(true);
    if (img === 0) {
      const last = projectData?.images.length as number;
      return setImg(last - 1);
    } else {
      return setImg((prev) => prev - 1);
    }
  };

  const onNext = () => {
    if (isPrev) {
      // Set the motion direction
      setIsPrev(false);
    }
    const last = projectData?.images.length as number;
    if (img + 1 === last) {
      return setImg(0);
    }
    return setImg((prev) => prev + 1);
  };

  useEffect(() => {
    const filter = data.projects.find((item) => item.id === modalId);
    setProjectData(filter || null);
  }, [projectData]);

  return (
    <Overlay>
      <Wrap>
        <XBtn onClick={onToggleModal}>
          <FontAwesomeIcon icon={faXmark} />
        </XBtn>
        {projectData ? (
          <Card>
            <ImgBox>
              <SliderBtn isLeft onClick={onPrev} />
              <AnimatePresence>
                <div>
                  <motion.img
                    key={"image" + img}
                    src={`${imgUrl}/works/${projectData?.images[img]}.png`}
                    initial={{ x: isPrev ? -300 : 300, opacity: 0.5 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: isPrev ? 300 : -300, opacity: 0.5 }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 17,
                    }}
                    alt="detail"
                  />
                </div>
              </AnimatePresence>
              <SliderBtn isLeft={false} onClick={onNext} />
            </ImgBox>
            <Content>
              <h4>{projectData?.title}</h4>
              <Line weight="1px" length="100%" color={theme.gray} />
              <LinkBox>
                <h5>사이트 : </h5>
                <a href={projectData?.github} target="_blank">
                  <FontAwesomeIcon icon={faGithub} /> 깃허브
                </a>
                <a href={projectData?.demo} target="_blank">
                  데모
                </a>
              </LinkBox>
              <span>
                {projectData?.team} | {projectData?.techStack}
              </span>
              <p>{projectData?.description}</p>
            </Content>
          </Card>
        ) : (
          <Error>
            <button onClick={onToggleModal}>
              <FontAwesomeIcon icon={faRotateLeft} />
            </button>
          </Error>
        )}
      </Wrap>
    </Overlay>
  );
}

export default ProjectModal;
