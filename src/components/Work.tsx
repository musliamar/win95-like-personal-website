import React, { useState, useEffect, useRef } from 'react'
import './Dialup.css'
import { useDispatch } from '../context'
import { SHOW_WORK, SET_CURRENTLY_ACTIVE } from '../constants'
import WorkIcon from '../media/work.png'
import './Work.css'
import WorkData from '../_work/work.txt'
import GithubIcon from '../media/github.png'
import YoutubeIcon from '../media/yt.png'
import Me from '../media/me.png'

function Work (): JSX.Element {
  const dispatch = useDispatch()
  const [x, setX] = useState(80)
  const [y, setY] = useState(150)
  const yIsPercentage = (y === 10) ? `${y}%` : `${y}px`
  const [pressed, setPressed] = useState(false)
  const initialWorkData: string[] = []
  const [workData, setWorkData] = useState(initialWorkData)
  const workRef = useRef<HTMLDivElement>(null)

  const handleClose = (): void => {
    dispatch({ type: SHOW_WORK, payload: false })
    /* dispatch({ type: SET_CURRENTLY_ACTIVE, payload: '' }) */
  }

  useEffect(() => {
    const { innerWidth } = window
    innerWidth < 1100 && setY(10)

    window.onclick = (event: MouseEvent) => {
      if ((workRef.current?.contains(event.target as Node)) === true) {
        dispatch({ type: SET_CURRENTLY_ACTIVE, payload: 'work' })
      }
    }
  }, [])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await fetch(WorkData).then(async (resp) => await resp.text()).then(data => {
        const result = data.split('\n')
        setWorkData(result)
      })
    }
    workData.length === 0 && fetchData()
  }, [workData])

  const handleMove = (e: React.MouseEvent): void => {
    if (pressed) {
      const { movementX, movementY } = e
      setX(x + movementY)
      setY(y + movementX)
    }
  }

  return (
    <div ref={workRef} className='work' style={{ top: `${x}px`, left: yIsPercentage }}>
        <div
          onMouseMove={(e) => { handleMove(e) }}
          onMouseDown={() => { setPressed(true) }}
          onMouseUp={() => { setPressed(false) }}
          onMouseLeave={() => { setPressed(false) }}
          className='window-title'>
          <div className='icon-and-title'>
            <img src={WorkIcon} alt='Me' width='20' />
            <span>My work</span>
          </div>
          <button className='close-window' onClick={() => { handleClose() }}>x</button>
        </div>
        <div className='window-content'>
            {workData.map((single) => {
              const parsed = JSON.parse(single)
              const { name, desc, picture, yt, github } = parsed

              return (
                <div key={github}>
                <div className='single-project'>
                    {window.innerWidth > 830 && <div className='picture'>
                        <img src={picture !== 'none' ? picture : Me} alt='Github icon' width='200' height='130' />
                    </div>}
                    <div className='details'>
                        <h3>{name}</h3>
                        <span>{desc}</span>
                        <div className='icons'>
                            <a href={github} target='_blank' rel="noreferrer">
                                <img src={GithubIcon} alt='Linkedin icon' width='30' />
                            </a>
                            {(yt !== 'none') && <a href={yt} target='_blank' rel="noreferrer">
                                <img src={YoutubeIcon} alt='Linkedin icon' width='30' />
                            </a>}
                        </div>
                    </div>
                </div>
                <hr className="divider" />
                </div>)
            })}
        </div>
    </div>
  )
}

export default Work
