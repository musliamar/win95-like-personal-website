import React from "react";

// Assets
import Globe from "../../media/win95globe.png";
import DialupIcon from "../../media/dialup-icon.png";

export const Progress = ({
  message,
  startConnect,
  setStartConnect,
  handleClose
}: {
  message: string;
  startConnect: boolean;
  setStartConnect: (value: boolean) => void;
  handleClose: () => void;
}) => (
  <div className="window-content">
    <div className="dialup-animation">
      <img className="globe-icon" src={Globe} alt="Dial-up globe" width="80" />
      {startConnect && <div className="loading" />}
      <img
        className="dialup-icon"
        src={DialupIcon}
        alt="Dial-up icon"
        width="120"
      />
    </div>
    {startConnect ? (
      <>
        <span className="dialup-label">Connect to Mutvak</span>
        <hr className="divider" />
        <fieldset>
          <legend>Action</legend>

          <span>
            Dialing attempt 1 of 5<span className="loading-simple"></span>
          </span>
        </fieldset>
        <fieldset>
          <legend>Status</legend>

          <span>
            {message}
            {message !== "Connected" && (
              <span className="loading-simple"></span>
            )}
          </span>
        </fieldset>
        <div onClick={handleClose} className="button">
          <span>Cancel</span>
        </div>
      </>
    ) : (
      <div onClick={() => setStartConnect(true)} className="button">
        <span>Connect</span>
      </div>
    )}
  </div>
);
