import React from 'react'
import HomeLayout from '../layouts/Home'
import { Helmet } from 'react-helmet'
import './index.sass'

export default function Home() {
  return (
  <HomeLayout>
    <Helmet title='Aurelien Davennes' />
    <div className='home'>
      <div className='home__choubi'>Aurelien Davennes</div>
    </div>
  </HomeLayout>
  )
}
