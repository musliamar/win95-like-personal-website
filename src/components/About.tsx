import React, { useState, useEffect, useRef } from 'react'
import './Dialup.css'
import { useDispatch } from '../context'
import { SHOW_ABOUT } from '../constants'
import Somebody from '../media/cia.png'
import Me from '../media/me.png'
import Linkedin from '../media/linkedin.png'
import Github from '../media/github.png'
import './About.css'

function About (): JSX.Element {
  const dispatch = useDispatch()
  const [x, setX] = useState(100)
  const [y, setY] = useState(130)
  const yIsPercentage = (y === 10) ? `${y}%` : `${y}px`
  const xIsPercentage = (x === 6) ? `${x}%` : `${x}px`
  const [pressed, setPressed] = useState(false)
  const aboutRef = useRef<HTMLDivElement>(null)

  const handleClose = (): void => {
    dispatch({ type: SHOW_ABOUT, payload: false })
    /* dispatch({ type: SET_CURRENTLY_ACTIVE, payload: '' }) */
  }

  useEffect(() => {
    const { innerWidth } = window
    if (innerWidth < 1100) {
      setY(10)
      setX(6)
    }

    /* window.onclick = (event: MouseEvent) => {
            if (aboutRef.current && aboutRef.current.contains(event.target as Node)){
                dispatch({ type: SET_CURRENTLY_ACTIVE, payload: 'about' })
            }}; */
  }, [])

  const handleMove = (e: React.MouseEvent): void => {
    if (pressed) {
      const { movementX, movementY } = e
      setX(x + movementY)
      setY(y + movementX)
    }
  }

  return (
    <div ref={aboutRef} className='about' style={{ top: xIsPercentage, left: yIsPercentage }}>
        <div
          onMouseMove={(e) => { handleMove(e) }}
          onMouseDown={() => { setPressed(true) }}
          onMouseUp={() => { setPressed(false) }}
          onMouseLeave={() => { setPressed(false) }}
          className='window-title'>
          <div className='icon-and-title'>
            <img src={Somebody} alt='Me' width='20' />
            <span>About me</span>
          </div>
          <button className='close-window' onClick={() => { handleClose() }}>x</button>
        </div>
        <div className='window-content'>
            <div className='personal-details'>
                <img src={Me} alt='Me' width='100' />
                <div className='name'>
                    <h1>Amar Musli</h1>
                    <span> from Bijeljina, Bosnia</span>
                </div>
            </div>
            <span>Experience: HTML, CSS, WordPress, SEO & Linux servers</span>
            <span>Basic skills: React (JavaScript/TypeScript) - MySQL - Git - NextJS - Redux-Toolkit - REST API - Tailwind CSS - Material UI - Figma</span>
            <span>Interests: Angular & .NET C#</span>
            <div className='contact'>
                <div className='email'>
                    <span>Contact: </span>
                    <span>amar@musli.ch</span>
                </div>
                <div className='icons'>
                    <a href='https://github.com/musliamar' target='_blank' rel="noreferrer">
                        <img src={Github} alt='Github icon' width='50' />
                    </a>
                    <a href='https://www.linkedin.com/in/musliamar/' target='_blank' rel="noreferrer">
                        <img src={Linkedin} alt='Linkedin icon' width='50' />
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
