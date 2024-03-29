import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeContext from '../contexts/theme'

const activeStyle = {
  color: 'goldenrod'
}

export default function Nav({ toggleTheme }) {
  const theme = React.useContext(ThemeContext)
  return (
    <nav className='row space-between'>
      <ul className='row nav'>
        <li>
          <NavLink
            exact
            to='/'
            activeStyle={ activeStyle }
            className='nav-link'>
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/battle'
            activeStyle={ activeStyle }
            className='nav-link'>
            Battle
          </NavLink>
        </li>
      </ul>
      <button
        className='btn-clear'
        style={{ fontSize: 24 }}
        onClick={ toggleTheme }>
        { theme === 'dark' ? '🌝' : '🌚' }
      </button>
    </nav>
  )
}