import React from 'react'
import { Helmet } from 'react-helmet'
import Menu from '../../components/Menu/'
import './page.sass'

const PageLayout = ({ title, children }) => {
  return (
    <>
      <Helmet title={`${title} - Aurelien Davennes`} />
      <header>
        <Menu />
      </header>
      <main className='page'>
        <header>
          <h1>{ title }</h1>
        </header>
        { children }
      </main>
    </>
  )
}

export default PageLayout
