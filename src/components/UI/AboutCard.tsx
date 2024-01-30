import styled from "styled-components";
import { Line } from "./Line";
import {
  laptop,
  fontFamily,
  fontSize,
  mobile,
  pointColor,
  space,
} from "../../style/styles";
import { motion } from "framer-motion";

// Style
const Card = styled(motion.li)`
  height: auto;
  width: 90%;
  margin-bottom: ${space.xlarge};
  font-family: ${fontFamily.kor};

  h3 {
    margin: ${space.small} 0 ${space.default} 0;
    font-weight: 700;
    font-size: ${fontSize.aboutTitle};
  }

  h5 {
    font-weight: 600;
  }
  li {
    line-height: 1.3;
    margin-bottom: ${space.medium};
    small,
    span {
      margin-right: ${space.small};
      font-size: ${fontSize.small};
      color: ${(p) => p.theme.gray};
    }
    p {
      white-space: pre-line;
      margin-top: ${space.micro};
    }
  }

  @media (max-width: ${laptop}) {
    font-size: 14px;
  }

  @media (max-width: ${mobile}) {
    font-size: 16px;
    h3 {
      font-size: ${fontSize.mobileTitle};
    }
  }
`;

interface IProps {
  children: React.ReactElement;
  title: string;
  index: number;
  id?: string | "";
}

export function AboutCard({ children, title, index, id }: IProps) {
  return (
    <Card
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      id={id}
    >
      <Line weight="5px" length="50px" color={pointColor.green} />
      <h3>{title}</h3>
      {children}
    </Card>
  );
}
