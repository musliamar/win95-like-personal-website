import React, { useState, useEffect } from 'react'
import './Dialup.css'
import Globe from '../media/win95globe.png'
import DialupIcon from '../media/dialup-icon.png'

function Dialup (): JSX.Element {

  return (
    <div className='dialup'>
        <div className='window-title'>
          <span>Dialing Progress</span>
        </div>
        <div className='dialup-content'>
          <div className='dialup-animation'>
            <img className='globe-icon' src={Globe} alt='Dial-up globe' width='80' />
            <div className="loading"></div>
            <img className='dialup-icon' src={DialupIcon} alt='Dial-up icon' width='120' />
          </div>
          <span className='dialup-label'>Connect to Mutvak</span>
          <fieldset>
            <legend>Action</legend>

            <span>Dialing attempt 1 of 5</span>
            </fieldset>
            <fieldset>
            <legend>Status</legend>

            <span>Dialing ...</span>
            </fieldset>
        </div>
    </div>
  )
}

export default Dialup
