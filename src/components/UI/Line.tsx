import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrap = styled.div<Iprops>`
  width: ${(p) => p.length};
  height: ${(p) => p.weight};
  background-color: ${(p) => (p.color ? p.color : p.theme.fontColor)};
  transform: ${(p) => (p.moveTo ? `translate(${p.moveTo})` : "none")};
  margin: ${(p) => p.margin};
`;

interface Iprops {
  length: string;
  weight: string;
  color?: string;
  moveTo?: string;
  margin?: string;
}

export function Line({ length, weight, color, moveTo, margin }: Iprops) {
  const [lineWeight, setLineWeight] = useState("");

  // Set Weight
  useEffect(() => {
    if (weight === "thin") {
      setLineWeight("2px");
    } else if (weight === "bold") {
      setLineWeight("7px");
    } else {
      setLineWeight(weight ? weight : "2px");
    }
  }, []);

  return (
    <Wrap
      length={length}
      weight={lineWeight}
      color={color}
      moveTo={moveTo}
      margin={margin}
    />
  );
}
