import React from "react";

// Assets
import ModemDial from "../../media/modem-dial.gif";
import DialingDone from "../../media/dialing-done.png";
import SoundOn from "../../media/sound-on.png";
import SoundOff from "../../media/sound-off.png";

// Utils
import { useStore, useDispatch } from "../../context";

// Constants
import { ENABLE_SOUND, SHOW_DIALUP } from "../../constants";

export const Clock = () => {
  const dispatch = useDispatch();
  const { showDialup, enableSound } = useStore();
  const time = new Date();
  const usTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });

  return (
    <div className="clock-and-icons">
      <img
        width="20"
        className="icon-in-taskbar"
        src={enableSound ? SoundOn : SoundOff}
        alt={enableSound ? "Sound on" : "Sound off"}
        onClick={() =>
          dispatch({ type: ENABLE_SOUND, payload: enableSound ? false : true })
        }
      />
      {showDialup ? (
        <img src={ModemDial} alt="Dialing" width="23" />
      ) : (
        <img
          onClick={() => dispatch({ type: SHOW_DIALUP, payload: true })}
          className="icon-in-taskbar"
          src={DialingDone}
          alt="Connected"
          width="23"
        />
      )}
      {usTime}
    </div>
  );
};
