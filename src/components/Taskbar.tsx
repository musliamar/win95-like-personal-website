import React from 'react'
import './Taskbar.css'
import StartIcon from '../media/win95icon.png'

function Taskbar (): JSX.Element {

    const time = new Date();
    const usTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

  return (
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
  )
}

export default Taskbar
