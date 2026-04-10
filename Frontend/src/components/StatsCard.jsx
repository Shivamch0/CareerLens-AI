

function StatsCard({image , className , content , percentage}) {
  return (
    <div className="flex my-2 justify-between items-center border max-h-40 p-4 ">

      <div className="bg-red-500 " >
        <h3>{content}</h3>
        <div className="flex">
          <h2>{percentage}</h2><p>%</p>
        </div>
        <div>
          Bar
        </div>
      </div>

     <img src={image} className="w-60 relative left-10"/>

    </div>
  )
}

export default StatsCard