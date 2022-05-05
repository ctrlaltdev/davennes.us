import React, { useState, useEffect } from 'react'
import './perspectivesvg.scss'

const randColor = () => {
  const colors = ['Turquoise', 'Aquamarine', 'SteelBlue', 'MidnightBlue', 'Chartreuse', 'SpringGreen', 'ForestGreen', 'OliveDrab', 'Gold', 'Khaki', 'Coral', 'OrangeRed 	', 'DarkOrange', 'IndianRed', 'Salmon', 'FireBrick', 'Crimson', 'MediumVioletRed', 'HotPink', 'DeepPink', 'Orchid', 'Purple', 'RebeccaPurple', 'Indigo']
  return colors[Math.floor(Math.random() * colors.length)]
}

const Line = ({ x1, y1, x2, y2, c = "var(--color_accent)" }) => (
  <line
    x1={ x1.toString() }
    y1={ y1.toString() }
    x2={ x2.toString() }
    y2={ y2.toString() }
    stroke={ c }
    strokeLinecap="round"
    />
)

const GenLines = ({ w, h }) => {
  const c = randColor()
  const origin = [
    {x: 0, y: 0},
    {x: w, y: 0},
    {x: w, y: h},
    {x: 0, y: h},
  ]

  const horizon = {
    x: Math.round(Math.random() * (w / 2) + (w / 4) ),
    y: Math.round(Math.random() * (h / 2) + (h / 4))
  }

  const lines = []
  for (let i = 0; i < 4; i++) {
    lines.push(<Line
        key={ `line-${i}` }
        x1={ origin[i].x }
        y1={ origin[i].y }
        x2={ horizon.x }
        y2={ horizon.y }
        />
    )
  }
  return (
    <>
      <style>
      { `:root {
          --color_accent: ${c}
        }`
      }
      </style>
      { lines }
    </>
  )
}

const PerspectiveSVG = () => {
  const [dimensions, setDimensions] = useState({ w: 0, h: 0, loaded: false })

  useEffect(() => {
    const w = parseInt(window.innerWidth)
    const h = parseInt(window.innerHeight)
    setDimensions({ w, h, loaded: true })
  }, [])

  return (
    <svg id='perspectivesvg'>
      { dimensions.loaded && 
        <GenLines
          w={ dimensions.w }
          h={ dimensions.h }
          />
      }
    </svg>
  )
}

export default PerspectiveSVG
