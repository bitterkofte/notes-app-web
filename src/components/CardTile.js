import React, { useState } from 'react'

const CardTile = ({ note }) => {
  const [isNote, setIsNote] = useState(false);
  const openNote = () => {
    setIsNote(!isNote);
  }

  return (
    <div className='p-5 rounded-xl bg-neutral-300 dark:bg-neutral-600 hover:scale-105 hover:drop-shadow-lg transition-all duration-400'
    onClick={openNote}>
      <h1 className='font-semibold text-lg'>{note.title}</h1>
      <p>{note.details}</p>
    </div>
  )
}

export default CardTile