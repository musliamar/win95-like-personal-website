import React from 'react'
import useSound from 'use-sound';
import dialupSound from '../media/dialup.mp3'

function DialupSoundButton (): JSX.Element {

    const [play] = useSound(dialupSound);
    
  return (
    <button onClick={() => play()}>Enable sound</button>
  )
}

export default DialupSoundButton
