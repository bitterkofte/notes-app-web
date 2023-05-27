import React from 'react'

const CardTile = ({ user}) => {
  return (
    <div className='p-5 rounded-xl bg-neutral-300 dark:bg-neutral-600 hover:scale-105 hover:drop-shadow-lg transition-all duration-400'>
      <h1 className='font-semibold text-lg'>{user.name}</h1>
      <p>{user.username}</p>
    </div>
  )
}

export default CardTile