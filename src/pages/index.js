import React from 'react'
import { Helmet } from 'react-helmet'
import HomeLayout from '../layouts/Home'
import './index.sass'

export default function Home() {
  return (
  <HomeLayout>
    <Helmet>
      <title>Aurelien Davennes</title>
    </Helmet>
    <div id='wrap'>
      <div id='choubi'>Aurelien Davennes</div>
    </div>
  </HomeLayout>
  )
}
