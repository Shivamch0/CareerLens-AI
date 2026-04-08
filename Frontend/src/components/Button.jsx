import { useNavigate } from "react-router-dom"

function Button({title , className , onClick}) {
  return (
    <button 
    className={` bg-blue-500 text-sm py-2 px-3 rounded-3xl cursor-pointer hover:bg-blue-800 transition-colors duration-300`} 
    onClick={onClick} 
    >
      {title}
    </button>
  )
}

export default Button