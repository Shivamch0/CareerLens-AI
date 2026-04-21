
function SuggestionCard({image , content , buttonText , className}) {
  return (
    <div className={` cursor-pointer flex flex-col gap-2 text-center justify-between p-4 sm:p-5 gap-3 rounded-2xl shadow-lg hover:scale-105 transition duration-300 ${className ? className : ' border border-white/20 shadow shadow-gray-500'}`}>
      <img src={image} className="w-16 sm:w-20 mx-auto" />
      <h3 className="font-bold ">{content}</h3>
      <button className={`text-sm font-bold mt-2 cursor-pointer  border-white/10 shadow shadow-gray-800 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:brightness-80 ${className ? className : 'bg-gray-800 border'}`}>{buttonText}</button>
    </div>
  )
}

export default SuggestionCard