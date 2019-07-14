import React from 'react'
import PropTypes from 'prop-types'
import { GiEgyptianWalk, GiBeamsAura, GiCrenelCrown } from 'react-icons/gi'

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

class PlayerInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.onSubmit(this.state.username)
  }

  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  render() {
    return(
      <form
        className='column player'
        onSubmit={this.handleSubmit}>
        <label
          htmlFor='username'
          className='player-label'>
          { this.props.label }
        </label>
        <div className='row player-inputs'>
          <input
            className='input-light'
            type='text'
            id='username'
            placeholder='github username'
            autoComplete='off'
            value={ this.state.username }
            onChange={ this.handleChange }
          />
          <button
            type='submit'
            className='btn btn-dark text-center'
            disabled={ !this.state.username }>
            Submit
          </button>
        </div>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default class Battle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playerOne: null,
      playerTwo: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(id, player) {
    this.setState({
      [id]: player // es6 property name
    })
  }

  render() {
    const { playerOne, playerTwo } = this.state
    return (
      <React.Fragment>
        <Instructions />
        <div className='player-container'>
          <h1 className='text-center header-lg'>
            Players
          </h1>
          <div className='row space-around'>
            {playerOne === null && (
              <PlayerInput
                label='Player One'
                onSubmit={(player) => this.handleSubmit('playerOne', player)}
              />
            )}

            {playerTwo === null && (
              <PlayerInput
                label='Player Two'
                onSubmit={(player) => this.handleSubmit('playerTwo', player)}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    )
  }
}