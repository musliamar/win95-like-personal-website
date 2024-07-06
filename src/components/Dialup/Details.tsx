import { useEffect, useState } from "react";

// Assets
import DialupWindowIcon from "../../media/dialup-window-icon.png";

export const Details = ({ handleClose }: { handleClose: () => void }) => {
  const [time, setTime] = useState(0);

  const secondsToHms = (d: number) => {
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    return `${h}h ${m}m ${s}s`;
  };

  useEffect(() => {
    const interval = setInterval(
      () => setTime((prevTime) => prevTime + 1),
      1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dialup-connected">
      <div className="informations">
        <div className="icon-and-data">
          <img src={DialupWindowIcon} alt="Connecting" width="50" />
          <div className="data">
            <span>Connected at 31200 bps</span>
            <span>Duration: {secondsToHms(time)}</span>
          </div>
        </div>
        <div className="buttons">
          <div onClick={handleClose} className="button">
            <span>Disconnect</span>
          </div>
        </div>
      </div>
      <hr className="divider" />
      <div className="server-and-protocols">
        <span>Server type: PPP: Windows 95, Windows NT 3.5, Internet</span>
        <span>Protocols</span>
        <div className="dialup-textarea">{"1) TCP/IP"}</div>
      </div>
    </div>
  );
};
