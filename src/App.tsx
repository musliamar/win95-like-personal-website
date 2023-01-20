import React, { useEffect } from 'react';
import './App.css';
import Taskbar from './components/Taskbar';
import Icons from './components/Icons';
import Dialup from './components/Dialup';
import About from './components/About';
import Work from './components/Work';
import { useStore, useDispatch } from './context';
import { SHOW_DIALUP } from './constants';

function App() {

  const { showDialup, showAbout, showWork } = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    !showDialup && dispatch({ type: SHOW_DIALUP, payload: true })
  }, [])

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

export default App;
