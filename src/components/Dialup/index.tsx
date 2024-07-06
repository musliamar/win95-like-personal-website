import { useState, useEffect, useRef, MouseEvent } from "react";
import useSound from "use-sound";

// Components
import { Progress } from "./Progress";
import { Details } from "./Details";

// Styles
import "./Dialup.css";

// Assets
import dialupSound from "../../media/dialup.mp3";
import DialupWindowIcon from "../../media/dialup-window-icon.png";

// Utils
import { useStore, useDispatch } from "../../context";

// Constants
import { SHOW_DIALUP } from "../../constants";

export const Dialup = () => {
  const dispatch = useDispatch();
  const { enableSound } = useStore();
  const [play, { stop, pause }] = useSound(dialupSound);
  const [playing, setPlaying] = useState(false);
  const [startConnect, setStartConnect] = useState(false);
  const [message, setMessage] = useState("Dialing");
  const [x, setX] = useState(170);
  const [y, setY] = useState(700);
  const yIsPercentage = y === 10 ? `${y}%` : `${y}px`;
  const xIsPercentage = x === 10 ? `${x}%` : `${x}px`;
  const [pressed, setPressed] = useState(false);
  const dialupRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    stop();
    setPlaying(false);
    dispatch({ type: SHOW_DIALUP, payload: false });
    /* dispatch({ type: SET_CURRENTLY_ACTIVE, payload: '' }) */
  };

  const handleMove = ({ movementX, movementY }: MouseEvent) => {
    if (!pressed) return;
    setX(x + movementY);
    setY(y + movementX);
  };

  useEffect(() => {
    const { innerWidth } = window;
    if (innerWidth >= 1100) return;
    setY(10);
    setX(10);

    /*  window.onclick = (event: MouseEvent) => {
      if (dialupRef.current && dialupRef.current.contains(event.target as Node)){
          dispatch({ type: SET_CURRENTLY_ACTIVE, payload: 'dialup' })
      }}; */
  }, []);

  useEffect(() => {
    if (!startConnect) return;
    const playMusic = () => {
      play();
      setPlaying(true);
    };

    const pauseMusic = () => {
      pause();
      setPlaying(false);
    };

    const stopMusic = () => {
      stop();
      setPlaying(false);
    };

    if (!playing && message === "Dialing" && !pressed) {
      playMusic();
      setTimeout(() => setMessage("Verifying user name and password"), 13000);
      setTimeout(() => setMessage("Logging on to network"), 21000);
      setTimeout(() => setMessage("Connected"), 26500);
    }

    if (message === "Connected") {
      stopMusic();
    }

    if (enableSound && message !== "Connected") {
      !playing && playMusic();
      return;
    }

    pauseMusic();
  }, [message, startConnect, pressed, x, y, playing, enableSound]);

  return (
    <div
      ref={dialupRef}
      className="dialup"
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
          <img src={DialupWindowIcon} alt="Connecting" width="20" />
          <span>
            {message !== "Connected"
              ? "Connecting to Mutvak"
              : "Connected to Mutvak"}
          </span>
        </div>
        <button className="close-window" onClick={handleClose}>
          x
        </button>
      </div>
      {message !== "Connected" ? (
        <Progress
          message={message}
          startConnect={startConnect}
          setStartConnect={setStartConnect}
          handleClose={handleClose}
        />
      ) : (
        <Details handleClose={handleClose} />
      )}
    </div>
  );
};
