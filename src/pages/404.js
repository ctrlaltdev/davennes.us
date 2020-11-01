import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import HomeLayout from '../layouts/Home'
import './404.sass'

export default function Home() {
  const looking = (i = -1) => {
    let datawrap = document.querySelector('span.looking')
    datawrap.removeChild(datawrap.querySelector('span'))
    var datatext = ['⌬', 'Ҩ', 'ǿ', 'ȣ', 'ȡ', 'Φ', 'θ', 'ϼ', 'Ю', '℧', '⏣', '⊡']
    let dataslide = document.createElement('span')
    let index = (i + 1) % datatext.length
    let dataslideTxt = document.createTextNode(datatext[index])
    dataslide.appendChild(dataslideTxt)
    datawrap.appendChild(dataslide)
    dataslide.classList.add('slideup')
    setTimeout(function () { looking(index) }, 2000)
  }

  useEffect(looking)

  return (
  <HomeLayout>
    <Helmet>
      <title>404 - Not Found</title>
    </Helmet>
    <div id="error404">
      <h1>
        <span>4</span>
        <span className="looking"><span>_</span></span>
        <span>4</span>
      </h1>
      <p className="subtitle">Not Found</p>
    </div>
  </HomeLayout>
  )
}
