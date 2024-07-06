import { useState, useEffect, useRef, MouseEvent } from "react";

// Styles
import "./Dialup/Dialup.css";
import "./About.css";

// Utils
import { useDispatch } from "../context";

// Constants
import { SHOW_ABOUT } from "../constants";

// Assets
import Somebody from "../media/cia.png";
import Me from "../media/me.png";
import Linkedin from "../media/linkedin.png";
import Github from "../media/github.png";

export const About = () => {
  const dispatch = useDispatch();
  const [x, setX] = useState(100);
  const [y, setY] = useState(130);
  const yIsPercentage = y === 10 ? `${y}%` : `${y}px`;
  const xIsPercentage = x === 6 ? `${x}%` : `${x}px`;
  const [pressed, setPressed] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    dispatch({ type: SHOW_ABOUT, payload: false });
    /* dispatch({ type: SET_CURRENTLY_ACTIVE, payload: '' }) */
  };

  useEffect(() => {
    const { innerWidth } = window;
    if (innerWidth >= 1100) return;
    setY(10);
    setX(6);

    /* window.onclick = (event: MouseEvent) => {
            if (aboutRef.current && aboutRef.current.contains(event.target as Node)){
                dispatch({ type: SET_CURRENTLY_ACTIVE, payload: 'about' })
            }}; */
  }, []);

  const handleMove = ({ movementX, movementY }: MouseEvent) => {
    if (!pressed) return;
    setX(x + movementY);
    setY(y + movementX);
  };

  return (
    <div
      ref={aboutRef}
      className="about"
      style={{ top: xIsPercentage, left: yIsPercentage }}
    >
      <div
        onMouseMove={handleMove}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        className="window-title"
      >
        <div className="icon-and-title">
          <img src={Somebody} alt="Me" width="20" />
          <span>About me</span>
        </div>
        <button className="close-window" onClick={handleClose}>
          x
        </button>
      </div>
      <div className="window-content">
        <div className="personal-details">
          <img src={Me} alt="Me" width="100" />
          <div className="name">
            <h1>Amar Musli</h1>
            <span>from Bijeljina, Bosnia</span>
          </div>
        </div>
        <span>
          Skills: <strong>JavaScript</strong> / <strong>TypeScript</strong> /{" "}
          <strong>React.js</strong> / <strong>React Native</strong> /{" "}
          <strong>Next.js</strong> / <strong>Expo</strong> /{" "}
          <strong>Cypress</strong> (end-to-end testing) / <strong>CI/CD</strong>{" "}
          (GitHub workflows) / <strong>MySQL</strong> / <strong>Prisma</strong>{" "}
          / <strong>tRPC</strong> / <strong>GraphQL</strong> /{" "}
          <strong>REST API</strong> / <strong>MobX</strong> /{" "}
          <strong>Redux-Toolkit</strong> / <strong>Node.js</strong> /{" "}
          <strong>Express.js</strong> / <strong>Sequelize</strong> /{" "}
          <strong>Material UI</strong> / <strong>Tailwind CSS</strong> /{" "}
          <strong>styled-components</strong> / <strong>WordPress</strong>
        </span>
        <div className="contact">
          <div className="email">
            <span>Contact: </span>
            <span>amar@musli.ch</span>
          </div>
          <div className="icons">
            <a
              href="https://github.com/musliamar"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Github} alt="Github icon" width="50" />
            </a>
            <a
              href="https://www.linkedin.com/in/musliamar/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Linkedin} alt="Linkedin icon" width="50" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
