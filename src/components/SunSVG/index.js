import React, { useState, useEffect } from 'react'
import './sunsvg.scss'

const randColor = () => {
  const colors = ['Khaki', 'Coral', 'OrangeRed 	', 'DarkOrange', 'IndianRed', 'Salmon', 'FireBrick', 'Crimson']
  return colors[Math.floor(Math.random() * colors.length)]
}

const Sun = ({ w, h }) => {
  const c = randColor()

  const s = Math.round(Math.random() * 10 + 40 )

  return (
    <circle
      cx={ Math.round(Math.random() * w ) }
      cy={ Math.round(Math.random() * h ) }
      r={ s }
      fill={ c }
      />
  )
}

const SunSVG = () => {
  const [dimensions, setDimensions] = useState({ w: 0, h: 0, loaded: false })

  useEffect(() => {
    const w = parseInt(window.innerWidth)
    const h = parseInt(window.innerHeight)
    setDimensions({ w, h, loaded: true })
  }, [])

  return (
    <svg id='sunsvg'>
      { dimensions.loaded && 
        <Sun
          w={ dimensions.w }
          h={ dimensions.h }
          />
      }
    </svg>
  )
}

export default SunSVG
