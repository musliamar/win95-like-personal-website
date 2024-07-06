// Assets
import Somebody from "../media/cia.png";
import Work from "../media/work.png";
import DialupWindowIcon from "../media/dialup-window-icon.png";

// Styles
import "./Icons.css";

// Utils
import { useDispatch } from "../context";

// Constants
import { SHOW_ABOUT, SHOW_DIALUP, SHOW_WORK } from "../constants";

export const Icons = () => {
  const maxHeight = (91 / 100) * window.innerHeight;
  const dispatch = useDispatch();

  return (
    <div style={{ height: maxHeight }} className="icons">
      <div
        className="single-icon"
        onClick={() => dispatch({ type: SHOW_ABOUT, payload: true })}
      >
        <img src={Somebody} alt="Me" width="60" />
        <span className="icon-label">About Me</span>
      </div>
      <div
        className="single-icon"
        onClick={() => dispatch({ type: SHOW_WORK, payload: true })}
      >
        <img src={Work} alt="My work" width="60" />
        <span className="icon-label">My Work</span>
      </div>
      <div
        className="single-icon"
        onClick={() => dispatch({ type: SHOW_DIALUP, payload: true })}
      >
        <img src={DialupWindowIcon} alt="Start connection" width="60" />
        <span className="icon-label">Internet Central</span>
      </div>
    </div>
  );
};
