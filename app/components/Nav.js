import React from 'react'
import { ThemeConsumer } from '../contexts/theme'

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className='row space-between'>
          <button
            className='btn-clear'
            style={{ fontSize: 24 }}
            onClick={ toggleTheme }>
            { theme === 'dark' ? '🌝' : '🌚' }
          </button>
        </nav>
      )}
    </ThemeConsumer>
  )
}