import React, { useEffect } from 'react';
import './App.css';
import Taskbar from './components/Taskbar';
import Icons from './components/Icons';
import Dialup from './components/Dialup';
import { useStore, useDispatch } from './context';
import { SHOW_DIALUP } from './constants';

function App() {

  const { showDialup } = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    !showDialup && dispatch({ type: SHOW_DIALUP, payload: true })
  }, [])

  return (
    <div className="App">
      <Icons />
      {showDialup === true ? <Dialup /> : null}
      <Taskbar />
    </div>
  );
}

export default App;
