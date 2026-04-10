

function StatsCard({image , className , content , percentage}) {
  return (
    <div className="flex my-2 items-center">

      <div >
        <h3>{content}</h3>
        <div className="flex">
          <h2>{percentage}</h2><p>%</p>
        </div>
        <div>
          Bar
        </div>
      </div>

      <div>
        <img src={image} />
      </div>

    </div>
  )
}

export default StatsCard