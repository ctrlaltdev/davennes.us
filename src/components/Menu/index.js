import React from 'react'
import { Link } from 'gatsby'
import './menu.sass'

const Menu = () => {
  return (
    <nav className='menu'>
      <ul className='menu__list'>
        <li className='menu__item'>
          <Link to='/' partiallyActive={ false } activeClassName='menu__current'>Home</Link>
        </li>
        <li className='menu__item'>
          <Link to='/about/' partiallyActive={ true } activeClassName='menu__current'>About</Link>
        </li>
        <li className='menu__item'>
          <Link to='/publications/' partiallyActive={ true } activeClassName='menu__current'>Publications</Link>
        </li>
        <li className='menu__item'>
          <Link to='/cv/' partiallyActive={ true } activeClassName='menu__current'>CV</Link>
        </li>
        <li className='menu__item'>
          <Link to='/contact/' partiallyActive={ true } activeClassName='menu__current'>Contact</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
