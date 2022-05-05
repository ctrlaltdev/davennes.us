import React from 'react'
import { Helmet } from 'react-helmet'
import Menu from '../../components/Menu/'
import Footer from '../../components/Footer/'
import PerspectiveSVG from '../../components/PerspectiveSVG/'
import SunSVG from '../../components/SunSVG/'

import './reset.css'
import './global.scss'
import './page.scss'

const PageLayout = ({ title, children }) => {
  return (
    <>
      <Helmet title={ title ? `${title} - Aurélien Davennes` : 'Aurélien Davennes' } />
      <PerspectiveSVG />
      <SunSVG />
      <div className='page'>
        <header>
          <Menu />
        </header>
        <main>
          {
            title && (<header>
              <h1>{ title }</h1>
            </header>)
          }
          { children }
        </main>
        <Footer />
      </div>
    </>
  )
}

export default PageLayout
