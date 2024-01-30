// Buttons on Slider
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { fontSize } from "../../style/styles";

const Btn = styled.button`
  font-size: ${fontSize.large};
  color: ${(p) => p.theme.gray};
  transition: color 0.3s ease;

  &:hover {
    color: ${(p) => p.theme.fontColor};
  }
`;

interface IProps {
  isLeft: boolean;
  onClick: () => void;
}

export function SliderBtn({ isLeft, onClick }: IProps) {
  const [icon, setIcon] = useState(faAngleLeft);

  useEffect(() => {
    setIcon(isLeft ? faAngleLeft : faAngleRight);
  }, [isLeft]);

  return (
    <Btn onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </Btn>
  );
}
