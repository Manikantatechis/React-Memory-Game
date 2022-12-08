import React, { useState } from 'react'

export default function SingleCard({card, handleChoice, flipped, disabled}) {
    // const [flip, setFlip] = useState(false)
    const handleClick = ()=>{
        if(!disabled){
            handleChoice(card)
        }
        
    }
  return (
      <div className="card" key={card.id}  >
        <div className = {flipped? 'flipped':''}>
              <img src={card.src} className='front' alt="card front" />
              <img src='/img/cover.png' alt="" className='back' onClick={handleClick} />
        </div>
      </div>
  )
}
