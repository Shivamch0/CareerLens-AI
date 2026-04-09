
function Button({title , className , onClick , type}) {

  return (
    <button 
    className={`cursor-pointer font-bold rounded-2xl py-2 px-3 text-sm  ${className ? className : 'bg-blue-500 hover:bg-blue-800 '} transition-colors duration-300`} 
    onClick={onClick} 
    type={type}
    >
      {title}
    </button>
  )
}

export default Button