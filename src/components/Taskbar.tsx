import React, { useEffect, useState } from 'react'
import './Taskbar.css'
import StartIcon from '../media/win95icon.png'
import { useStore, useDispatch } from '../context'
import { SHOW_DIALUP_BUTTON } from '../constants'
import DialupSoundButton from './DialupSoundButton'

function Taskbar (): JSX.Element {

    const time = new Date();
    const usTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const dispatch = useDispatch();
    const { showDialupButton, showDialup } = useStore();

  return (
    <div className='taskbar-container'>
    <div className='credits'>
        {(showDialupButton && showDialup) && <DialupSoundButton />}
        {showDialup && <button onClick={() => dispatch({ type: SHOW_DIALUP_BUTTON, payload: true })}>Play sound?</button>}
        <span>W95FA font by <a href='https://sava.io/' target='_blank' rel="noreferrer">Alina Sava</a></span>
        <span>Windows 95 icons by <a href='https://github.com/trapd00r/win95-winxp_icons' target='_blank' rel="noreferrer">trapd00r</a></span>
    </div>
    <div className='taskbar'>
        <div className='taskbar-items'>
            <div className='start-button'>
                <img src={StartIcon} alt='Start button' width='30' />
                <span className='start-label'>Start</span>
            </div>
            <div className='clock-and-icons'>
                {usTime}
            </div>
        </div>
    </div>
    </div>
  )
}

export default Taskbar
