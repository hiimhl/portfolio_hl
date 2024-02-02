import styled from "styled-components";
import {
  fontFamily,
  space,
  mobile,
  tablet,
  laptop,
  fontSize,
} from "../style/styles";
import { AboutCard } from "./UI/AboutCard";
import data from "../data/data.json";
import AboutInfo from "./AboutInfo";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { imgUrl } from "../utill";
import { infoData } from "../data/testData";

// Style
export const Section = styled.section`
  font-size: 16px;
  font-family: ${fontFamily.eng};
  width: 100%;
  height: auto;
  max-width: 1440px;
  margin: auto;

  @media (max-width: ${tablet}) {
    height: auto;
    min-height: 70vh;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 7% 10%;
  background-image: ${"url(" + imgUrl + "/cloud_blue.png)"};
  background-position: top 5em;
  background-size: contain;
  background-repeat: no-repeat;
  display: grid;
  grid-template-columns: 20% 60%;
  gap: 20%;

  @media (max-width: ${tablet}) {
    grid-template-columns: 30% 60%;
    gap: ${space.xlarge};
  }
  @media (max-width: ${mobile}) {
    display: flex;
    flex-direction: column;
  }
`;

const Detail = styled.ul`
  padding-top: ${space.section};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: ${mobile}) {
    padding: 0 ${space.default};
  }
`;

const TechCard = styled.ul`
  display: flex;
  width: 100%;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
  padding-left: ${space.large};
  li {
    width: 100%;
    h5 {
      font-family: ${fontFamily.eng};
      font-weight: 100;
      font-size: ${fontSize.default};
    }
    p {
      margin-left: ${space.default};
      width: 90%;
      padding-bottom: ${space.default};
      line-height: 1.5;
      max-width: 700px;
    }
    img {
      width: 80%;
    }
  }

  @media (max-width: ${laptop}) {
    li {
      P {
        padding-bottom: ${space.micro};
      }
      span {
        font-size: ${fontSize.micro};
      }
    }
  }
`;

const AcademyCard = styled.ul`
  li {
    margin-bottom: ${space.large};

    h5 {
      margin-bottom: ${space.micro};
      font-size: ${fontSize.medium};
    }
    span,
    small {
      font-size: ${fontSize.default};
      margin-bottom: ${space.micro};
    }
  }
`;

const MoreBtn = styled.button`
  color: ${(p) => p.theme.fontColor};
`;

const LicenseCard = styled.ul`
  font-size: ${fontSize.default};
  p {
    margin-right: ${space.small};
    display: inline-block;
  }
`;
const EducationCard = styled.ul`
  div {
    display: grid;
    grid-template-columns: 25% 75%;
    margin-bottom: ${space.small};
  }
`;

// Data
const education = infoData.education;
const academy = data.resume.academy;
const academySlice = academy.slice(0, 3);
const license = data.resume.license;
const techStack = data.resume.techStack;

function About() {
  const [academyData, setAcademyData] = useState(academySlice);
  const [moreInfo, setMoreInfo] = useState(false);

  useEffect(() => {
    if (moreInfo) {
      setAcademyData(academy);
    } else {
      setAcademyData(academySlice);
    }
  }, [moreInfo]);

  const onMore = () => {
    setMoreInfo((prev) => !prev);
  };

  return (
    <Section id="about">
      <Content>
        <AboutInfo />
        <Detail>
          <AboutCard title="학력" index={1}>
            <EducationCard>
              <div>
                <h5>대학교</h5>
                <p> : {education.name}</p>
              </div>
              <div>
                <h5>전공</h5>
                <p> : {education.major}</p>
              </div>
              <div>
                <h5>재학 기간</h5>
                <p> : {education.period}</p>
              </div>
            </EducationCard>
          </AboutCard>
          <AboutCard title="보유 기술" index={2}>
            <TechCard>
              {techStack.map((item, index) => (
                <li key={"tech" + index}>
                  <h5>- {item.name}</h5>
                  <p>{item.description}</p>
                </li>
              ))}
            </TechCard>
          </AboutCard>
          <AboutCard title="교육" index={3} id="aboutScroll">
            <>
              <AcademyCard>
                {academyData.map((item, index) => (
                  <li key={"academy" + index}>
                    <h5>{item.title}</h5>
                    <small>{item.period}</small>
                    <span>{item.academyName}</span>
                    <p>{item.description}</p>
                  </li>
                ))}
              </AcademyCard>
              <MoreBtn onClick={onMore}>
                <FontAwesomeIcon
                  icon={moreInfo ? faChevronUp : faChevronDown}
                />
                {moreInfo ? " 접기" : " 더보기"}
              </MoreBtn>
            </>
          </AboutCard>
          <AboutCard title="자격증" index={4}>
            <LicenseCard>
              {license.map((item, index) => (
                <li key={"license" + index}>
                  <h5>{item.title}</h5>
                  <p>{item.date}</p>
                  <small>{item.name}</small>
                </li>
              ))}
            </LicenseCard>
          </AboutCard>
        </Detail>
      </Content>
    </Section>
  );
}

export default About;
