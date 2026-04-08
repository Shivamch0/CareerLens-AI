import React from 'react'

function HomeCard({title , content , icon}) {
  return (
   <div>

        <div>
            {icon}
        </div>

        <div>
            <h4>{title}</h4>
            <p>{content}</p>
        </div>
   </div>
  )
}

export default HomeCard