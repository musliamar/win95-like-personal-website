import React, { useState, useEffect } from 'react'
import './Dialup.css'
import Globe from '../media/win95globe.png'
import DialupIcon from '../media/dialup-icon.png'
import { useStore, useDispatch } from '../context'
import { SHOW_DIALUP, DIALING_ACTIVE } from '../constants'
import useSound from 'use-sound';
import dialupSound from '../media/dialup.mp3'
import DialupWindowIcon from '../media/dialup-window-icon.png'

function Dialup (): JSX.Element {

  const dispatch = useDispatch()
  const { enableSound, dialingActive } = useStore()
  const [play, exposedData] = useSound(dialupSound);
  const [message, setMessage] = useState('Dialing')
  const [x, setX] = useState(200)
  const [y, setY] = useState(200)
  const [pressed, setPressed] = useState(false);
  const [time, setTime] = useState(0);
  
  const handleClose = () => {
    exposedData.stop()
    dispatch({ type: SHOW_DIALUP, payload: false })
  }

  
  const handleMove = (e: React.MouseEvent) => {
    if(pressed) {
      const { movementX, movementY } = e;
      setX(x + movementY)
      setY(y - movementX)
    }
  };

  useEffect(() => {
    if(message === 'Dialing' && !pressed && x === 200 && y === 200){
      enableSound ? play() : exposedData.pause()
      setTimeout(() => setMessage('Verifying user name and password'), 13000)
      setTimeout(() => setMessage('Logging on to network'), 21000)
      setTimeout(() => setMessage('Connected'), 26500)
    }

    if(message === 'Connected'){
      exposedData.stop()
    }

    if(!enableSound){
      exposedData.pause()
    }
  }, [message, pressed, x, y, enableSound, play, exposedData, dispatch]) 

  function secondsToHms(d: number) {

    d = Number(d);

    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    return h + 'h : ' + m + 'm : ' + s + 's'; 
}

  const connectingProcess = 
        <div className='dialup-content'>
          <div className='dialup-animation'>
            <img className='globe-icon' src={Globe} alt='Dial-up globe' width='80' />
            <div className="loading"></div>
            <img className='dialup-icon' src={DialupIcon} alt='Dial-up icon' width='120' />
          </div>
          <span className='dialup-label'>Connect to Mutvak</span>
          <fieldset>
            <legend>Action</legend>

            <span>Dialing attempt 1 of 5<span className="loading-simple"></span></span>
            </fieldset>
            <fieldset>
            <legend>Status</legend>

            <span>{message}{message !== 'Connected' && <span className="loading-simple"></span>}</span>
            </fieldset>
            <div onClick={() => handleClose()} className='button'>
                <span>Cancel</span>
            </div>
        </div>

  const ConnectedDetails = () => {

    useEffect(() => {
      let interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    return () => clearInterval(interval);
    }, [])

    return (<div className='dialup-connected'>
          <div className='informations'>
            <div className='icon-and-data'>
              <img src={DialupWindowIcon} alt='Connecting' width='50' />
              <div className='data'>
                <span>Connected at 31200 bps</span>
                <span>Duration: {secondsToHms(time)}</span>
              </div>
            </div>
            <div className='buttons'>
              <div onClick={() => handleClose()} className='button'>
                <span>Disconnect</span>
              </div>
            </div>
          </div>
          <div className='server-and-protocols'>
            <span>Server type: PPP: Windows 95, Windows NT 3.5, Internet</span>
            <span>Protocols</span>
            <div className='dialup-textarea'>
              {'1) TCP/IP'}
            </div>
          </div>
        </div>)}

  return (
    <div className='dialup' style={{top: `${x}px`, right: `${y}px`}}>
        <div 
          onMouseMove={(e) => handleMove(e)} 
          onMouseDown={() => setPressed(true)} 
          onMouseUp={() => setPressed(false)} 
          onMouseLeave={() => setPressed(false)} 
          className='window-title'>
          <div className='icon-and-title'>
            <img src={DialupWindowIcon} alt='Connecting' width='20' />
            <span>{message !== 'Connected' ? 'Connecting to Mutvak' : 'Connected to Mutvak'}</span>
          </div>
          <button className='close-window' onClick={() => handleClose()}>x</button>
        </div>
        {message !== 'Connected' ? connectingProcess : <ConnectedDetails />}
    </div>
  )
}

export default Dialup
