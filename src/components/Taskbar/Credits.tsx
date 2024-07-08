import React from "react";

// Assets
import PreviewIcon from "../../media/preview.png";

// Utils
import { useStore, useDispatch } from "../../context";

// Constants
import { ENABLE_SOUND } from "../../constants";

export const Credits = () => {
  const dispatch = useDispatch();
  const { enableSound } = useStore();

  return (
    <div className="credits">
      <span>BETA VERSION 1.3.3.7</span>
      <button
        onClick={() => dispatch({ type: ENABLE_SOUND, payload: !enableSound })}
      >
        {enableSound ? "Disable sound" : "Enable sound"}
      </button>
      <span>W95FA font by Alina Sava</span>
      <span>
        Windows 95 icons by{" "}
        <a
          href="https://github.com/trapd00r/win95-winxp_icons"
          target="_blank"
          rel="noreferrer"
        >
          trapd00r <img src={PreviewIcon} alt="Preview icon" width="20" />
        </a>
      </span>
    </div>
  );
};
