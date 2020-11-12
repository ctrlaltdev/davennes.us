import React from 'react'
import { Helmet } from 'react-helmet'
import Menu from '../../components/Menu/'
import Footer from '../../components/Footer/'
import './page.sass'

const PageLayout = ({ title, children }) => {
  return (
    <>
      <Helmet title={`${title} - Aurelien Davennes`} />
      <div className='page'>
        <header>
          <Menu />
        </header>
        <main>
          <header>
            <h1>{ title }</h1>
          </header>
          { children }
        </main>
        <Footer />
      </div>
    </>
  )
}

export default PageLayout
