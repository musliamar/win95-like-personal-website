import React, { useState, useEffect, useRef } from 'react'
import './Dialup.css'
import Globe from '../media/win95globe.png'
import DialupIcon from '../media/dialup-icon.png'
import { useStore, useDispatch } from '../context'
import { SHOW_DIALUP } from '../constants'
import useSound from 'use-sound'
import dialupSound from '../media/dialup.mp3'
import DialupWindowIcon from '../media/dialup-window-icon.png'

function Dialup (): JSX.Element {
  const dispatch = useDispatch()
  const { enableSound } = useStore()
  const [play, exposedData] = useSound(dialupSound)
  const [playing, setPlaying] = useState(false)
  const [startConnect, setStartConnect] = useState(false)
  const [message, setMessage] = useState('Dialing')
  const [x, setX] = useState(170)
  const [y, setY] = useState(700)
  const yIsPercentage = (y === 10) ? `${y}%` : `${y}px`
  const [pressed, setPressed] = useState(false)
  const [time, setTime] = useState(0)
  const dialupRef = useRef<HTMLDivElement>(null)

  const handleClose = (): void => {
    exposedData.stop()
    setPlaying(false)
    dispatch({ type: SHOW_DIALUP, payload: false })
    /* dispatch({ type: SET_CURRENTLY_ACTIVE, payload: '' }) */
  }

  const handleMove = (e: React.MouseEvent): void => {
    if (pressed) {
      const { movementX, movementY } = e
      setX(x + movementY)
      setY(y + movementX)
    }
  }

  useEffect(() => {
    const { innerWidth } = window
    innerWidth < 1100 && setY(10)

    /*  window.onclick = (event: MouseEvent) => {
      if (dialupRef.current && dialupRef.current.contains(event.target as Node)){
          dispatch({ type: SET_CURRENTLY_ACTIVE, payload: 'dialup' })
      }}; */
  }, [])

  useEffect(() => {
    if (startConnect) {
      const playMusic = (): void => {
        play()
        setPlaying(true)
      }

      const pauseMusic = (): void => {
        exposedData.pause()
        setPlaying(false)
      }

      const stopMusic = (): void => {
        exposedData.stop()
        setPlaying(false)
      }

      if (!playing && message === 'Dialing' && !pressed && x === 170) {
        playMusic()
        setTimeout(() => { setMessage('Verifying user name and password') }, 13000)
        setTimeout(() => { setMessage('Logging on to network') }, 21000)
        setTimeout(() => { setMessage('Connected') }, 26500)
      }

      if (message === 'Connected') {
        stopMusic()
      }

      if (enableSound && (message !== 'Connected')) {
        !playing && playMusic()
      } else {
        pauseMusic()
      }
    }
  }, [message, startConnect, pressed, x, y, play, playing, exposedData, enableSound, dispatch])

  function secondsToHms (d: number): string {
    d = Number(d)

    const h = Math.floor(d / 3600)
    const m = Math.floor(d % 3600 / 60)
    const s = Math.floor(d % 3600 % 60)

    return `${h}h ${m}m ${s}s`
  }

  const connectingProcess =
        <div className='window-content'>
          <div className='dialup-animation'>
            <img className='globe-icon' src={Globe} alt='Dial-up globe' width='80' />
            {startConnect && <div className="loading"></div>}
            <img className='dialup-icon' src={DialupIcon} alt='Dial-up icon' width='120' />
          </div>
          {startConnect
            ? <><span className='dialup-label'>Connect to Mutvak</span>
          <hr className="divider" />
          <fieldset>
            <legend>Action</legend>

            <span>Dialing attempt 1 of 5<span className="loading-simple"></span></span>
            </fieldset>
            <fieldset>
            <legend>Status</legend>

            <span>{message}{message !== 'Connected' && <span className="loading-simple"></span>}</span>
            </fieldset>
            <div onClick={() => { handleClose() }} className='button'>
                <span>Cancel</span>
            </div></>
            : <div onClick={() => { setStartConnect(true) }} className='button'>
              <span>Connect</span>
            </div>}
        </div>

  const ConnectedDetails = (): JSX.Element => {
    useEffect(() => {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
      return () => { clearInterval(interval) }
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
              <div onClick={() => { handleClose() }} className='button'>
                <span>Disconnect</span>
              </div>
            </div>
          </div>
          <hr className="divider" />
          <div className='server-and-protocols'>
            <span>Server type: PPP: Windows 95, Windows NT 3.5, Internet</span>
            <span>Protocols</span>
            <div className='dialup-textarea'>
              {'1) TCP/IP'}
            </div>
          </div>
        </div>)
  }

  return (
    <div ref={dialupRef} className='dialup' style={{ top: `${x}px`, left: yIsPercentage }}>
        <div
          onMouseMove={(e) => { handleMove(e) }}
          onMouseDown={() => { setPressed(true) }}
          onMouseUp={() => { setPressed(false) }}
          onMouseLeave={() => { setPressed(false) }}
          className='window-title'>
          <div className='icon-and-title'>
            <img src={DialupWindowIcon} alt='Connecting' width='20' />
            <span>{message !== 'Connected' ? 'Connecting to Mutvak' : 'Connected to Mutvak'}</span>
          </div>
          <button className='close-window' onClick={() => { handleClose() }}>x</button>
        </div>
        {message !== 'Connected' ? connectingProcess : <ConnectedDetails />}
    </div>
  )
}

export default Dialup
