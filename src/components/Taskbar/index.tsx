import { useState } from "react";

// Components
import { StartContent } from "./StartContent";
import { Credits } from "./Credits";
import { Windows } from "./Windows";
import { Clock } from "./Clock";

// Styles
import "./Taskbar.css";

export const Taskbar = () => {
  const [showStartPanel, setShowStartPanel] = useState(false);

  return (
    <div className="taskbar-container">
      <Credits />
      {showStartPanel && <StartContent setShowStartPanel={setShowStartPanel} />}
      <div className="taskbar">
        <div className="taskbar-items">
          <Windows
            showStartPanel={showStartPanel}
            setShowStartPanel={setShowStartPanel}
          />
          <Clock />
        </div>
      </div>
    </div>
  );
};
