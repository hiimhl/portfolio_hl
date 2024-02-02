// Contact page
import styled from "styled-components";
import data from "../data/data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { fontSize, space } from "../style/styles";
import { infoData } from "../data/testData";

// Style
const Wrap = styled.footer`
  background-image: url("Assets/cloud.png"), ${(p) => p.theme.contact}; //image, color
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  width: 100%;
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  flex-direction: column;
  gap: ${space.small};

  div {
    font-size: ${fontSize.small};
    svg {
      margin-right: ${space.micro};
    }
  }
  a {
    font-size: ${space.medium};
  }
`;

const info = infoData.personalInfo;

function Contact() {
  return (
    <Wrap id="contact">
      <div>
        <FontAwesomeIcon icon={faPhone} /> {info.phoneNum}
      </div>
      <div>
        <FontAwesomeIcon icon={faEnvelope} /> {info.email}
      </div>
      <a href={info.github}>
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </Wrap>
  );
}

export default Contact;
