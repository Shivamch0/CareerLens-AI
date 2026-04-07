import { useNavigate } from "react-router-dom"

function Button({title , className , onClick}) {
  return (
    <button 
    className={` bg-blue-500 py-1 px-3 rounded-full cursor-pointer hover:bg-blue-800 transition-colors duration-300`} 
    onClick={onClick} 
    >
      {title}
    </button>
  )
}

export default Button