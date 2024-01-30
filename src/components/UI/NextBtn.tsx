// Next button - blinking animation
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll/modules";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

// Animation
const opacityAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
`;

// Style
const Button = styled(motion.span)<{ color: string | undefined }>`
  font-size: 1.1em;
  cursor: pointer;
  animation: ${opacityAnimation} 1s linear infinite;

  a,
  svg {
    color: ${(p) => (p.color ? p.color : p.theme.fontColor)};
  }
  svg {
    font-size: 1.25em;
    transform: translate(3px, 3px);
  }
`;

interface IProps {
  title?: string;
  goTo: string;
  color?: string;
  isDownicon?: boolean;
}

export function NextBtn({ title, goTo, color, isDownicon }: IProps) {
  const [iconAngle, setIconAngle] = useState(faAngleRight);
  useEffect(() => {
    if (isDownicon) {
      setIconAngle(faAngleDoubleDown);
    } else {
      setIconAngle(faAngleRight);
    }
  }, [isDownicon]);
  return (
    <Button color={color}>
      <Link to={goTo} smooth={true} delay={300}>
        {title || "NEXT"}
        {<FontAwesomeIcon icon={iconAngle} />}
      </Link>
    </Button>
  );
}
