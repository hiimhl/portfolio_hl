// Modal for item card in project list

import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Line } from "./UI/Line";
import { IProject } from "../data/data_type";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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

// Style
const Wrap = styled.article`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: ${space.micro};
  top: 0;
  left: 0;
  background-color: ${(p) => p.theme.backgroundColor};
  display: inline-block;
  font-size: ${fontSize.default};
  font-family: ${fontFamily.kor};
`;

const Card = styled.div`
  margin: auto;
  width: 80%;
  height: 95%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  h4 {
    font-weight: 600;
    font-size: ${fontSize.medium};
    margin-top: ${space.small};
    margin-bottom: ${space.micro};
    letter-spacing: 1.5px;
  }
  span {
    font-size: ${fontSize.small};
    color: ${(p) => p.theme.gray};
  }
  p {
    line-height: 1.3;
    margin-top: ${space.small};
    white-space: pre-line;
  }

  @media (max-width: ${tablet}) {
    width: 85%;
    /* Information */
    div:last-child {
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
  }
  @media (max-width: ${mobile}) {
    width: 100%;
    div:last-child {
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
  }
`;
const ImgBox = styled.div`
  width: 75%;
  overflow: hidden;
  margin: auto;
  padding-top: ${space.medium};

  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${tablet}) {
    width: 100%;
    position: relative;

    /* Slider Buttons */
    button {
      position: absolute;
    }
    button:last-child {
      right: 0;
    }
  }
`;

const LinkBox = styled.nav`
  margin: ${space.small} 0;
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

// interface
interface IProps {
  item: IProject | null;
  isOpen: boolean;
}

function ProjectModal({ item, isOpen }: IProps) {
  const [img, setImg] = useState(0);
  const [isPrev, setIsPrev] = useState(false);
  const theme = useTheme();
  const navigation = useNavigate();

  const onPrev = () => {
    setIsPrev(true);
    if (img === 0) {
      const last = item?.images.length as number;
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
    const last = item?.images.length as number;
    if (img + 1 === last) {
      return setImg(0);
    }
    return setImg((prev) => prev + 1);
  };

  // Image changes every 4 seconds when Modal is opened
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        onNext();
      }, 4000);

      return () => {
        clearInterval(interval); // 컴포넌트가 언마운트되기 전에 인터벌을 해제.
      };
    }
  }, [isOpen, img]);

  return (
    <Wrap>
      <XBtn onClick={() => navigation("/")}>
        <FontAwesomeIcon icon={faXmark} />
      </XBtn>
      <Card>
        <ImgBox>
          <SliderBtn isLeft={true} onClick={onPrev} />
          <AnimatePresence>
            <div>
              <motion.img
                key={"image" + img}
                src={`${imgUrl}/works/${item?.images[img]}.png`}
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
        <div>
          <h4>{item?.title}</h4>
          <Line weight="1px" length="100%" color={theme.gray} />
          <LinkBox>
            <h5>사이트 : </h5>
            <a href={item?.github} target="_blank">
              <FontAwesomeIcon icon={faGithub} /> 깃허브
            </a>
            <a href={item?.demo} target="_blank">
              데모
            </a>
          </LinkBox>
          <span>
            {item?.team} | {item?.techStack}
          </span>
          <p>{item?.description}</p>
        </div>
      </Card>
    </Wrap>
  );
}

export default ProjectModal;
