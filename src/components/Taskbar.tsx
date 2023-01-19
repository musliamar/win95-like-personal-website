import React, { useEffect, useState } from 'react'
import './Taskbar.css'
import StartIcon from '../media/win95icon.png'
import { useStore, useDispatch } from '../context'
import { ENABLE_SOUND, SHOW_DIALUP } from '../constants'
import ModemDial from '../media/modem-dial.gif'
import DialingDone from '../media/dialing-done.png'
import SoundOn from '../media/sound-on.png'
import SoundOff from '../media/sound-off.png'
import DialupWindowIcon from '../media/dialup-window-icon.png'
import Windows95Vertical from '../media/windowsvertical.png'

function Taskbar (): JSX.Element {

    const time = new Date();
    const usTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const dispatch = useDispatch();
    const { showDialup, enableSound } = useStore();
    const [showStartPanel, setShowStartPanel] = useState(false)

    const StartContent = () => {
        return(<div className='start-content'>
            <div className='start-windows-label'>
            <img src={Windows95Vertical} alt='Connecting'/>
            </div>
            <div className='start-content-items'>
                <div className='single-item'>
                    <img src={DialupWindowIcon} alt='Connecting' width='25' />
                    <span>Programs</span>
                </div>
                <div className='single-item'>
                <img src={DialupWindowIcon} alt='Connecting' width='25' />
                    <span>Programs</span>
                </div>
                <div className='single-item'>
                <img src={DialupWindowIcon} alt='Connecting' width='25' />
                    <span>Programs</span>
                </div>
                <div className='single-item'>
                <img src={DialupWindowIcon} alt='Connecting' width='25' />
                    <span>Programs</span>
                </div>
                <div className='single-item'>
                <img src={DialupWindowIcon} alt='Connecting' width='25' />
                    <span>Programs</span>
                </div>
            </div>
        </div>)
    }

  return (
    <div className='taskbar-container'>
    <div className='credits'>
        <button onClick={() => dispatch({type: ENABLE_SOUND, payload: !enableSound})}>{enableSound ? 'Disable sound' : 'Enable sound'}</button>
        <span>W95FA font by <a href='https://sava.io/' target='_blank' rel="noreferrer">Alina Sava</a></span>
        <span>Windows 95 icons by <a href='https://github.com/trapd00r/win95-winxp_icons' target='_blank' rel="noreferrer">trapd00r</a></span>
    </div>
    {showStartPanel && <StartContent />}
    <div className='taskbar'>
        <div className='taskbar-items'>
            <div className='start-and-windows'>
                <div onClick={() => setShowStartPanel(!showStartPanel)} className={showStartPanel ? 'start-button active' : 'start-button'}>
                    <img src={StartIcon} alt='Start button' width='30' />
                    <span className='start-label'>Start</span>
                </div>
                <div className='windows'>
                    {showDialup && <div className='window-button'>
                        <img src={DialupWindowIcon} alt='Connecting' width='20' />
                        <span>Dialing status</span>
                    </div>}
                </div>
            </div>
            <div className='clock-and-icons'>
                {enableSound ? <img onClick={() => dispatch({ type: ENABLE_SOUND, payload: false })} className='icon-in-taskbar' src={SoundOn} alt='Sound on' width='20' />
                : <img onClick={() => dispatch({ type: ENABLE_SOUND, payload: true })} className='icon-in-taskbar' src={SoundOff} alt='Sound off' width='20' /> }
                {showDialup ? <img src={ModemDial} alt='Dialing' width='23' />
                : <img onClick={() => dispatch({ type: SHOW_DIALUP, payload: true })} className='icon-in-taskbar' src={DialingDone} alt='Connected' width='23' /> }
                {usTime}
            </div>
        </div>
    </div>
    </div>
  )
}

export default Taskbar
