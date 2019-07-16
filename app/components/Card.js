import React from 'react'
import PropTypes from 'prop-types'

export default function Card ({ header, avatar, href, name, subheader, children }) {

  return (
    <div className='card bg-light'>
      <h2 className='header-lg text-center'>
        { header }
      </h2>
      <img
        className='avatar'
        src={ avatar }
        alt={ `Avatar for ${name}` }
      />
      <h3 className='text-center'>
        <a className='link'
          href={ href }>
          { name }
        </a>
      </h3>
      {subheader && (
        <h4 className='text-center'>
          Score: { subheader }
        </h4>
      )}
      { children }
    </div>
  )
}

Card.prototype = {
  header: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subheader: PropTypes.string
}