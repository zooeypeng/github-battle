import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '32px',
    textAlign: 'center',
    margin: '20px auto',
    display: 'block'
  }
}

export default function Loading ({ text = 'Loading', speed = 300 }) {
  const [ content, setContent ] = React.useState(text)

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setContent((content) => {
        return content === `${text}...`
          ? text
          : `${content}.`
      })
    }, speed)
    return () => window.clearInterval(id)
  }, [text, speed])

  return (
    <p style={ styles.content }>
      { content }
    </p>
  )
}

Loading.proptypes = {
  text: PropTypes.string,
  speed: PropTypes.number
}