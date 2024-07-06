import { useEffect, useRef } from "react";

// Assets
import Somebody from "../../media/cia.png";
import WorkIcon from "../../media/work.png";
import Windows95Vertical from "../../media/windowsvertical.png";
import Linkedin from "../../media/linkedin.png";
import Github from "../../media/github.png";
import DialupWindowIcon from "../../media/dialup-window-icon.png";

// Utils
import { useDispatch } from "../../context";

// Constants
import { SHOW_DIALUP, SHOW_ABOUT, SHOW_WORK } from "../../constants";

export const StartContent = ({
  setShowStartPanel
}: {
  setShowStartPanel: (value: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const startRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.onclick = ({ target }: MouseEvent) =>
      setShowStartPanel(
        startRef.current?.contains(target as Node) === true ? true : false
      );
  });

  return (
    <div ref={startRef} className="start-content">
      <div className="start-windows-label">
        <img src={Windows95Vertical} alt="Connecting" />
      </div>
      <div className="start-content-items">
        <div
          className="single-item"
          onClick={() => dispatch({ type: SHOW_ABOUT, payload: true })}
        >
          <img src={Somebody} alt="Connecting" width="25" />
          <span>About Me</span>
        </div>
        <a href="https://github.com/musliamar" target="_blank" rel="noreferrer">
          <div className="single-item">
            <img src={Github} alt="Github icon" width="25" />
            <span>My GitHub</span>
          </div>
        </a>
        <a
          href="https://www.linkedin.com/in/musliamar/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="single-item">
            <img src={Linkedin} alt="Linkedin icon" width="25" />
            <span>My LinkedIn</span>
          </div>
        </a>
        <div
          className="single-item"
          onClick={() => dispatch({ type: SHOW_WORK, payload: true })}
        >
          <img src={WorkIcon} alt="Connecting" width="25" />
          <span>My Work</span>
        </div>
        <div
          className="single-item"
          onClick={() => dispatch({ type: SHOW_DIALUP, payload: true })}
        >
          <img src={DialupWindowIcon} alt="Connecting" width="25" />
          <span>Dial-up Connection</span>
        </div>
      </div>
    </div>
  );
};
