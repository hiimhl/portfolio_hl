// Header - navbar and theme buttons

import styled, { useTheme } from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, animateScroll as scroll } from "react-scroll/modules";
import {
  laptop,
  fontFamily,
  fontSize,
  mobile,
  space,
  tablet,
} from "../style/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userTheme } from "../data/atom";
import { imgUrl } from "../utill";

// Style
const Wrap = styled(motion.header)`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  height: 7vh;
  padding: ${space.medium} ${space.large};
  font-family: ${fontFamily.eng};
  justify-content: space-between;
  background-color: ${(p) => p.theme.backgroundColor};
  box-shadow: ${(p) => p.theme.boxShadow};

  .toggle_btn {
    display: hidden;
  }

  @media (max-width: ${tablet}) {
    height: 7vh;
    align-items: center;
  }
`;

const Logo = styled.span`
  cursor: pointer;
  width: 50px;
  font-size: ${fontSize.large};
  position: relative;
  margin-right: ${space.small};

  /* Logo image */
  img {
    position: absolute;
    width: 50px;
    top: -0.7em;
    /* top: 0; */
  }

  @media (max-width: ${tablet}) {
    img {
      height: 1.7em;
    }
  }
`;

const NavContent = styled.div<{ isMenu: boolean }>`
  display: flex;
  align-items: center;
  nav {
    margin-right: ${space.medium};

    a,
    span {
      cursor: pointer;
      margin-right: ${space.large};
    }
  }

  /* Theme button */
  button {
    font-size: ${fontSize.medium};
    transform: translateY(1px);
    color: ${(p) => p.theme.fontColor};
  }

  @media (max-width: ${laptop}) {
    /* Theme button */
    button {
      transform: translateY(-1px);
    }
  }
  @media (max-width: ${tablet}) {
    /* Menu */
    nav {
      display: ${(p) => (p.isMenu ? "hidden" : "initial")};
      position: absolute;
      width: 100%;
      display: flex;
      top: 0;
      left: 0;
      align-items: center;
      flex-direction: column;
      background-color: ${(p) => p.theme.backgroundColor};
      margin-top: 5vh;

      a,
      span {
        padding: ${space.medium} 0;
        display: inline-block;
      }
    }

    button {
      font-size: ${fontSize.large};
      transform: translateY(3px);
    }

    .toggle_btn {
      display: initial;
      margin-left: ${space.small};
      font-size: ${fontSize.large};
    }
  }

  @media (max-width: ${mobile}) {
    button {
      font-size: ${fontSize.medium};
    }

    .toggle_btn {
      font-size: ${fontSize.medium};
    }
  }
`;

function Header() {
  const [theme, setTheme] = useRecoilState(userTheme);
  const [menu, setMenu] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollY } = useScroll();
  const headerAnimation = useAnimation();
  const onGoHome = () => scroll.scrollToTop();
  const logoTheme = useTheme();

  // Editing Grid for Moblie and Tablet
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 1050) {
        setIsMobile(true);
        setMenu(false);
      } else {
        setIsMobile(false);
        setMenu(true);
      }
    };

    handleResize(); // 초기 실행

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Animate the Header
  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() > 80) {
        headerAnimation.start({ opacity: 1, y: 0 });
      } else {
        headerAnimation.start({ opacity: 0, y: -100 });
        setIsHidden(false);
      }
    });
  }, [headerAnimation, scrollY]);

  const onThemeHandler = () => setTheme(theme ? false : true);
  const onToggleMenu = () => setMenu((prev) => !prev);
  const onClickMenu = () => (isMobile ? onToggleMenu() : undefined);

  return (
    <Wrap
      initial={{ opacity: 0, y: -100 }}
      animate={headerAnimation}
      transition={{ duration: 0.5 }}
    >
      <Logo onClick={onGoHome}>
        <img src={imgUrl + logoTheme.logo} />
      </Logo>
      <NavContent isMenu={isHidden}>
        {menu && (
          <nav>
            <span onClick={onGoHome}>Home</span>
            <Link to="about" smooth={true} delay={300} onClick={onClickMenu}>
              About
            </Link>
            <Link to="project" smooth={true} delay={300} onClick={onClickMenu}>
              Project
            </Link>
            <Link to="contact" smooth={true} delay={300} onClick={onClickMenu}>
              Contact
            </Link>
          </nav>
        )}
        <button onClick={onThemeHandler}>
          {theme ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </button>
        {isMobile && (
          <FontAwesomeIcon
            icon={faBars}
            onClick={onToggleMenu}
            className="toggle_btn"
          />
        )}
      </NavContent>
    </Wrap>
  );
}

export default Header;
