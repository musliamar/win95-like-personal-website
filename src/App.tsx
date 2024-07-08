import React, { useEffect } from "react";

// Components
import { Taskbar } from "./components/Taskbar";
import { Icons } from "./components/Icons";
import { Dialup } from "./components/Dialup";
import { About } from "./components/About";
import { Work } from "./components/Work";

// Styles
import "./App.css";

// Utils
import { useStore, useDispatch } from "./context";

// Constants
import { SHOW_DIALUP } from "./constants";

export default function App() {
  const { showDialup, showAbout, showWork } = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    !showDialup && dispatch({ type: SHOW_DIALUP, payload: true });
  }, [dispatch]);

  return (
    <div className="App">
      <Icons />
      {showDialup && <Dialup />}
      {showAbout && <About />}
      {showWork && <Work />}
      <Taskbar />
    </div>
  );
}
