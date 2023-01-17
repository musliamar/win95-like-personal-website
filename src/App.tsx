import React from 'react';
import logo from './logo.svg';
import './App.css';
import Taskbar from './components/Taskbar';
import Icons
 from './components/Icons';
function App() {
  return (
    <div className="App">
      <Icons />
      <Taskbar />
    </div>
  );
}

export default App;
