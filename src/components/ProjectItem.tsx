// Item card in the Project list

import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import {
  fontFamily,
  fontSize,
  pointColor,
  space,
  laptop,
  tablet,
} from "../style/styles";
import { IProject } from "../data/data_type";
import { motion, AnimatePresence } from "framer-motion";
import { imgUrl } from "../utill";

// Style
const Card = styled(motion.li)<{ bordercolor: string }>`
  font-size: 16px;
  border-top: 7px solid
    ${(p) =>
      p.bordercolor === "react" ? pointColor.orange : pointColor.yellow};
  cursor: pointer;
  font-family: ${fontFamily.kor};
  padding: ${space.medium};
  border-radius: ${space.micro};
  background-color: ${(p) => p.theme.backgroundColor};
  -webkit-box-shadow: ${(p) => p.theme.boxShadow};
  box-shadow: ${(p) => p.theme.boxShadow};
  min-height: 200px;
  overflow: hidden;

  /* title */
  h4 {
    font-weight: 600;
    font-size: ${fontSize.medium};
    margin-top: ${space.default};
    padding-bottom: ${space.micro};
    margin-bottom: ${space.micro};
    border-bottom: 1px solid ${(p) => p.theme.gray};
  }

  span {
    font-size: ${fontSize.small};
    margin: ${space.small} 0;
    color: ${(p) => p.theme.gray};
    word-break: break-all;
  }
  /* description */
  p {
    line-height: 1.3;
    margin-top: ${space.default};
    font-size: ${fontSize.default};
  }

  @media (max-width: ${laptop}) {
    font-size: 14px;
  }

  @media (max-width: ${tablet}) {
    font-size: 16px;
  }
`;

const ImgBox = styled.div`
  width: 100%;
  height: 50%;
  overflow: hidden;
  border-radius: ${space.micro};

  img {
    width: 100%;
    height: 100%;
    transition: all 0.4s ease;
  }
  img:hover {
    transform: scale(1.1);
  }

  @media (max-width: ${laptop}) {
    height: 45%;
  }
`;

// interface
interface IProps {
  item: IProject;
  goDetail: () => void;
  index: number;
}

function ProjectItem({ item, goDetail, index }: IProps) {
  const [isBorderColor, setIsBorderColor] = useState("");

  useEffect(() => {
    const type = item.type === "react" ? "react" : "";
    setIsBorderColor(type);
  }, [item.type]);
  const theme = useTheme();

  return (
    <AnimatePresence>
      <Card
        bordercolor={isBorderColor}
        onClick={goDetail}
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <ImgBox>
          <img src={`${imgUrl}/works/${item.id}.png`} />
        </ImgBox>
        <div>
          <h4>{item.title}</h4>
          <span>
            {item.team} | {item.techStack.slice(0, 35) + "..."}
          </span>
          <p>{item.description.slice(0, 100) + "..."}</p>
        </div>
      </Card>
    </AnimatePresence>
  );
}

export default ProjectItem;
