// About page - Personal Information
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import data from "../data/data.json";
import {
  laptop,
  fontFamily,
  fontSize,
  mobile,
  pointColor,
  space,
  tablet,
} from "../style/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlogger, faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faAngleDoubleDown,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { imgUrl } from "../utill";
import { NextBtn } from "./UI/NextBtn";
import { animateScroll } from "react-scroll";

// Style
const Content = styled(motion.article)`
  width: 100%;
  font-family: ${fontFamily.kor};
  margin-right: ${space.section};
  padding-top: ${space.section};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${space.large};

  @media (max-width: ${mobile}) {
    padding: ${space.section} ${space.default};
  }
`;

const MyImg = styled.div`
  align-items: center;

  /* Image box */
  div {
    width: 63%;
    height: 12em;

    background-image: ${"url(" + imgUrl + "/portrait.jpg)"};
    background-position: center;
    background-size: cover;
  }
  p {
    font-family: ${fontFamily.point};
    font-size: ${fontSize.large};
    margin-top: ${space.default};
    line-height: 1;
    padding: 0 ${space.micro};
    white-space: pre-line;
  }

  @media (max-width: ${laptop}) {
    /* Portrait Image */
    div {
      min-width: 150px;
    }
    p {
      margin-top: ${space.medium};
    }
  }
  @media (max-width: ${tablet}) {
    div {
      height: 12em;
      width: 80%;
    }
    p {
      margin-top: ${space.large};
    }
  }
  @media (max-width: ${mobile}) {
    div {
      height: 10em;
      width: 35%;
      min-width: 120px;
    }
    p {
      margin-top: ${space.large};
    }
  }
`;

const Info = styled.div`
  width: 100%;
  padding: 0 5%;

  /* Personal Information */
  ul {
    margin-bottom: ${space.default};
    li {
      margin-bottom: ${space.small};
      font-size: ${fontSize.default};
      b {
        font-weight: 700;
      }
    }
  }

  @media (max-width: ${tablet}) {
    /* Personal Information */
    ul {
      li {
        margin-bottom: ${space.default};
      }
    }
  }
`;

const GoLink = styled.nav`
  font-size: ${fontSize.medium};
  a {
    font-size: ${space.medium};
    color: ${pointColor.blue};
  }
  /* Go to ... */
  & > a {
    margin-right: ${space.small};
    transition: color 0.3s ease;
  }
  a:hover {
    color: ${(p) => p.theme.gray};
  }
  /* Download icons */
  /* div {
    display: flex;
    margin-top: ${space.default};
    text-align: center;
    justify-content: center;
    a {
      transition: color 0.3s ease;
      display: flex;
      flex-direction: column;
      margin-right: ${space.medium};
      color: ${(p) => p.theme.gray};
      span {
        margin-top: ${space.small};
        font-size: ${fontSize.micro};
      }
    }
    a:hover {
      color: ${pointColor.blue};
    }
  } */

  @media (max-width: ${laptop}) {
    div {
      margin-top: ${space.medium};
    }
  }

  @media (max-width: ${tablet}) {
    div {
      margin-top: ${space.large};
    }
  }
`;

const ScrollBtn = styled.div`
  margin-top: ${space.default};
  @media (max-width: ${mobile}) {
    display: none;
  }
`;

const infoData = data.resume;

function AboutInfo() {
  return (
    <Content
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <MyImg>
        <div>{/* Image */}</div>
        <p>{infoData.personalInfo.sentence}</p>
      </MyImg>
      <Info>
        <ul>
          <li>
            <b>이름</b> : {infoData.personalInfo.name}
          </li>
          <li>
            <b>생년월일</b> : {infoData.personalInfo.birth}
          </li>
          <li>
            <b>
              <FontAwesomeIcon icon={faPhone} />
            </b>{" "}
            : {infoData.personalInfo.phoneNum}
          </li>
          <li>
            <b>
              <FontAwesomeIcon icon={faEnvelope} />
            </b>{" "}
            : {infoData.personalInfo.email}
          </li>
        </ul>
        <GoLink>
          <a href={infoData.personalInfo.github} target="_blank">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href={infoData.personalInfo.blog} target="_blank">
            <FontAwesomeIcon icon={faBlogger} />
          </a>
          <ScrollBtn>
            <NextBtn
              goTo="aboutScroll"
              color="white"
              isDownicon={true}
              title=" "
            />
          </ScrollBtn>
          {/*<div>
             <a href="#" download>
              <FontAwesomeIcon icon={faDownload} />
              <span>이력서</span>
            </a>
            <a href="Assets/portfolio.pdf" download>
              <FontAwesomeIcon icon={faDownload} />
              <span>
                이력서
                <br />
                PPT
              </span>
            </a> 
          </div>*/}
        </GoLink>
      </Info>
    </Content>
  );
}

export default AboutInfo;
