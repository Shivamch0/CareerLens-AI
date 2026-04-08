
function Button({title , className , onClick}) {

  return (
    <button 
    className={`cursor-pointer ${className ? className : 'bg-blue-500 hover:bg-blue-800 rounded-3xl py-2 px-3 text-sm '} transition-colors duration-300`} 
    onClick={onClick} 
    >
      {title}
    </button>
  )
}

export default Button