import React from 'react'
import Somebody from '../media/cia.png'
import Work from '../media/work.png'
import DialupWindowIcon from '../media/dialup-window-icon.png'
import './Icons.css'
import { useStore, useDispatch } from '../context'
import { SHOW_ABOUT, SHOW_DIALUP, SHOW_WORK } from '../constants'

function Icons (): JSX.Element {

    const maxHeight = (91 / 100) * window.innerHeight
    const dispatch = useDispatch()
    const { showAbout, showWork, showDialup } = useStore()

  return (
    <div style={{ height: maxHeight }} className='icons'>
        <div onClick={() => dispatch({ type: SHOW_ABOUT, payload: true })} className='single-icon'>
            <img src={Somebody} alt='Me' width='60' />
            <span className='icon-label'>About Me</span>
        </div>
        <div onClick={() => dispatch({ type: SHOW_WORK, payload: true })} className='single-icon'>
            <img src={Work} alt='My work' width='60' />
            <span className='icon-label'>My Work</span>
        </div>  
        <div onClick={() => dispatch({ type: SHOW_DIALUP, payload: true })} className='single-icon'>
            <img src={DialupWindowIcon} alt='Start connection' width='60' />
            <span className='icon-label'>Internet Central</span>
        </div>  
    </div>
  )
}

export default Icons
