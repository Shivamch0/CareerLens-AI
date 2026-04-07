import React from 'react'

function Button({title , className}) {
  return (
    <button className={` bg-blue-500 py-1 px-3 rounded-full cursor-pointer hover:bg-blue-800 transition-colors duration-300`}>
      {title}
    </button>
  )
}

export default Button