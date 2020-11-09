import React, { useState } from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import './menu.sass'

const Menu = () => {
  const [open, toggleOpen] = useState(false)

  return (
    <nav className={classNames('menu', open ? 'menu--open' : 'menu--closed')}>
      <button className='menu__burger' onClick={() => toggleOpen(!open)}>X</button>
      <ul className={classNames('menu__list', open ? 'menu__list--open' : 'menu__list--closed')}>
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
