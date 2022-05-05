import React, { useState } from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import './menu.scss'

const Menu = () => {
  const [open, toggleOpen] = useState(false)

  return (
    <nav className={classNames('menu', open ? 'menu--open' : 'menu--closed')}>
      <button className={classNames('menu__burger', open ? 'menu__burger--open' : 'menu__burger--closed')} onClick={() => toggleOpen(!open)}>
      <svg fill="transparent">
        <line x1="20%" y1="50%" x2="80%" y2="50%"/>
        <line x1="20%" y1="50%" x2="80%" y2="50%"/>
        <line x1="20%" y1="50%" x2="80%" y2="50%"/>
        <circle cx="50%" cy="50%" r="20" fill="transparent" />
      </svg>
      </button>
      <ul className={classNames('menu__list', open ? 'menu__list--open' : 'menu__list--closed')}>
        <li className='menu__item'>
          <Link to='/' partiallyActive={ false } activeclassname='menu__current'>Home</Link>
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
