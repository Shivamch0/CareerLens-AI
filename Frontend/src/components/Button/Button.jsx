
function Button({title , className , onClick , type , icon}) {

  return (
    <button 
    className={`cursor-pointer font-bold rounded-2xl  px-6 text-base sm:text-lg  ${className ? className : 'bg-blue-500 hover:bg-blue-800 py-3 '} transition-colors duration-300`} 
    onClick={onClick} 
    type={type}
    >
      {title} {icon}
    </button>
  )
}

export default Button