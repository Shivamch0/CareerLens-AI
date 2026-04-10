

function SuggestionCard({image , content , buttonText}) {
  return (
    <div className={`flex flex-col items-center justify-around border border-white/20 shadow shadow-gray-500 p-2 `}>
      <img src={image} />
      <h3>{content}</h3>
      <button>{buttonText}</button>
    </div>
  )
}

export default SuggestionCard