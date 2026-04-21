
function Button({title , className , onClick , type}) {

  return (
    <button 
    className={`cursor-pointer font-bold rounded-2xl py-3 px-6 text-base sm:text-lg  ${className ? className : 'bg-blue-500 hover:bg-blue-800 '} transition-colors duration-300`} 
    onClick={onClick} 
    type={type}
    >
      {title}
    </button>
  )
}

export default Button