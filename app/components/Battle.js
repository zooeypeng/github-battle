import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { GiEgyptianWalk, GiBeamsAura, GiCrenelCrown, GiBroom } from 'react-icons/gi'

function Instructions() {
  return (
    <div className='instruction-contaienr'>
      <h1 className='header-lg text-center'>
        Instructions
      </h1>
      <ol className='container-sm grid text-center battle-instructions'>
        <li>
          <GiEgyptianWalk
            className='bg-light'
            color=''
            size={ 100 }
          />
          <h3 className='header-sm'>
            Enter two github users
          </h3>
        </li>
        <li>
          <GiBeamsAura
            className='bg-light'
            color=''
            size={ 100 }
          />
          <h3 className='header-sm'>
            Battle
          </h3>
        </li>
        <li>
          <GiCrenelCrown
            className='bg-light'
            color=''
            size={ 100 }
          />
          <h3 className='header-sm'>
            See the winner
          </h3>
        </li>
      </ol>
    </div>
  )
}

function PlayerInput ({ onSubmit, label }) {
  const [ username, setUsername ] = React.useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(username)
  }

  const handleChange = e => setUsername(e.target.value)

  return(
    <form
      className='column player'
      onSubmit={handleSubmit}>
      <label
        htmlFor='username'
        className='player-label'>
        { label }
      </label>
      <div className='row player-inputs'>
        <input
          className='input-light'
          type='text'
          id='username'
          placeholder='github username'
          autoComplete='off'
          value={ username }
          onChange={ handleChange }
        />
        <button
          type='submit'
          className='btn btn-dark text-center'
          disabled={ !username }>
          Submit
        </button>
      </div>
    </form>
  )
}

function PlayerPreview({ username, onReset, label }) {
  return (
    <div className='column player'>
      <h3 className='player-label'>
        { label }
      </h3>
      <div className='row bg-light'>
        <div className='player-info'>
          <img
            className='avatar-sm'
            src={ `http://github.com/${username}.png?size=200` }
            alt={ `Avatar for ${username}` }
          />
          <a
            className='link'
            href={ `http://github.com/${username}` }>
            { username }
          </a>
          <button
            className='btn-clear btn-reset'
            onClick={ onReset }>
            <GiBroom
              color='beige'
              size={ 20 }
            />
          </button>
        </div>
      </div>
    </div>
  )
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default function Battle () {
  const [ playerOne, setPlayerOne ] = React.useState(null)
  const [ playerTwo, setPlayerTwo ] = React.useState(null)

  const handleSubmit = (id, player) => id === 'playerOne'
    ? setPlayerOne(player)
    : setPlayerTwo(player)

  const handleReset = (id) => id === 'playerOne'
    ? setPlayerOne(null)
    : setPlayerTwo(null)

    return (
      <React.Fragment>
        <Instructions />
        <div className='player-container'>
          <h1 className='text-center header-lg'>
            Players
          </h1>
          <div className='row space-around'>
            {playerOne === null
              ? <PlayerInput
                  label='Player One'
                  onSubmit={(player) => handleSubmit('playerOne', player)}
                />
              : <PlayerPreview
                  label='Player One'
                  username={ playerOne }
                  onReset={ () => handleReset('playerOne') }
                />
            }

            {playerTwo === null
              ? <PlayerInput
                  label='Player Two'
                  onSubmit={(player) => handleSubmit('playerTwo', player)}
                />
              : <PlayerPreview
                  label='Player Two'
                  username={ playerTwo }
                  onReset={ () => handleReset('playerTwo') }
                />
            }
          </div>
          {playerOne && playerTwo && (
            <Link
              to={{
                pathname: '/battle/results',
                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
              }}
              className='btn btn-dark btn-space text-center'>
              Battle
            </Link>
          )}
        </div>
      </React.Fragment>
    )
}
