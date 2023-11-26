import React from 'react'

import './Stats.css'

function Stats() {
  return (
    <div className="stats">
        <div>
              <p className='title'>All-time profit</p>
              <p className='change'>43.58%(+ $8,716.65)</p>
        </div>
        <div>
              <p className='title'>Best Performer(Bitcoin)</p>
              <p className='change'>43.58%(+ $8,716.65)</p>
        </div>
        <div>
              <p className='title'>Worst Performer(Bitcoin)</p>
              <p className='change'>43.58%(+ $8,716.65)</p>
        </div>
      </div>
  )
}

export default Stats