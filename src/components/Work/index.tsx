import React, { useState, useEffect, useRef } from "react";

// Components
import { Single } from "./Single";

// Styles
import "../Dialup/Dialup.css";
import "./Work.css";

// Utils
import { useDispatch } from "../../context";

// Constants
import { SHOW_WORK, SET_CURRENTLY_ACTIVE } from "../../constants";

// Assets
import WorkData from "../../_work/work.txt";
import WorkIcon from "../../media/work.png";

export const Work = () => {
  const dispatch = useDispatch();
  const [x, setX] = useState(80);
  const [y, setY] = useState(150);
  const yIsPercentage = y === 10 ? `${y}%` : `${y}px`;
  const xIsPercentage = x === 3 ? `${x}%` : `${x}px`;
  const [pressed, setPressed] = useState(false);
  const initialWorkData: string[] = [];
  const [workData, setWorkData] = useState(initialWorkData);
  const workRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    dispatch({ type: SHOW_WORK, payload: false });
    /* dispatch({ type: SET_CURRENTLY_ACTIVE, payload: '' }) */
  };

  useEffect(() => {
    const { innerWidth } = window;
    if (innerWidth < 1100) {
      setY(10);
      setX(3);
    }

    window.onclick = ({ target }: MouseEvent) => {
      if (workRef.current?.contains(target as Node) !== true) return;
      dispatch({ type: SET_CURRENTLY_ACTIVE, payload: "work" });
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(WorkData)
        .then(async (resp) => await resp.text())
        .then((data) => {
          const result = data.split("\n");
          setWorkData(result);
        });
    };

    if (workData.length === 0) fetchData();
  }, [workData]);

  const handleMove = ({ movementX, movementY }: React.MouseEvent) => {
    if (!pressed) return;
    setX(x + movementY);
    setY(y + movementX);
  };

  return (
    <div
      ref={workRef}
      className="work"
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
          <img src={WorkIcon} alt="Me" width="20" />
          <span>My work</span>
        </div>
        <button className="close-window" onClick={handleClose}>
          x
        </button>
      </div>
      <div className="window-content">
        {workData.map((single) => (
          <Single key={single} data={JSON.parse(single)} />
        ))}
      </div>
    </div>
  );
};
