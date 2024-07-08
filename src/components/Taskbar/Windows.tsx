import React, { useEffect, useRef } from "react";

// Assets
import StartIcon from "../../media/win95icon.png";
import Somebody from "../../media/cia.png";
import WorkIcon from "../../media/work.png";
import DialupWindowIcon from "../../media/dialup-window-icon.png";

// Utils
import { useStore } from "../../context";

export const Windows = ({
  showStartPanel,
  setShowStartPanel
}: {
  showStartPanel: boolean;
  setShowStartPanel: (value: boolean) => void;
}) => {
  const { showDialup, showAbout, showWork } = useStore();
  const startButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.onclick = ({ target }: MouseEvent) =>
      setShowStartPanel(
        startButtonRef.current?.contains(target as Node) === true ? true : false
      );
  });

  return (
    <div className="start-and-windows">
      <div
        ref={startButtonRef}
        className={showStartPanel ? "start-button active" : "start-button"}
      >
        <img src={StartIcon} alt="Start button" width="30" />
        <span className="start-label">Start</span>
      </div>
      <div className="windows">
        {showDialup && (
          <div className="window-button">
            <img src={DialupWindowIcon} alt="Connecting" width="20" />
            {window.innerWidth > 600 && <span>Dialing status</span>}
          </div>
        )}
        {showAbout && (
          <div className="window-button">
            <img src={Somebody} alt="Me" width="20" />
            {window.innerWidth > 600 && <span>About me</span>}
          </div>
        )}
        {showWork && (
          <div className="window-button">
            <img src={WorkIcon} alt="Me" width="20" />
            {window.innerWidth > 600 && <span>My work</span>}
          </div>
        )}
      </div>
    </div>
  );
};
