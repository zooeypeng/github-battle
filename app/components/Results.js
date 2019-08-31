import React from 'react'
import { Link } from 'react-router-dom'
import { battle } from '../utils/api'
import queryString from 'query-string'
import { GoMarkGithub, GoGlobe, GoKeyboard, GoRepoForked, GoTelescope } from "react-icons/go"
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Tooltip from './Tooltip'

function ProfileList ({ profile }) {
  return (
    <ul className='card-list'>
      <li>
        <GoMarkGithub
          color='rosybrown'
          size={ 15 }
        />
        { profile.name }
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's Location">
            <GoGlobe
              color='rosybrown'
              size={ 15 }
            />
            { profile.location }
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's Company">
            <GoKeyboard
              color='rosybrown'
              size={ 15 }
            />
            { profile.company }
          </Tooltip>
        </li>
      )}
      <li>
        <GoRepoForked
          color='rosybrown'
          size={ 15 }
        />
        { profile.followers.toLocaleString() } followers
      </li>
      <li>
        <GoTelescope
          color='rosybrown'
          size={ 15 }
        />
        { profile.following.toLocaleString() } following
      </li>
    </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
}

function battleReducer (state, action) {
  switch (action.type) {
    case 'success':
      return {
        winner: action.winner,
        loser: action.loser,
        error: null,
        loading: false,
      }
    case 'fail':
      return {
        ...state,
        error: action.message,
        loading: false
      }
    default:
      throw new Error(`This action type is not supported.`)
  }
}

export default function Resultes ({ location}) {
  const initialState = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }

  const { playerOne, playerTwo } = queryString.parse(location.search)
  const [ state, dispatch ] = React.useReducer(battleReducer, initialState)

  React.useEffect(() => {
    battle([ playerOne, playerTwo ])
      .then((players) => dispatch({ type: 'success', winner: players[0], loser: players[1] }))
      .catch(({ message }) => dispatch({ type: 'fail', message }))
  }, [ playerOne, playerTwo ])

  const { winner, loser, error, loading } = state

    if (loading === true) {
      return <Loading text='Battling' />
    }

    if (error) {
      return (
        <p className='center-text error'>
          { error }
        </p>
      )
    }

  return (
    <React.Fragment>
      <div className='grid space-around container-sm'>
        <Card
          header={ winner.score === loser.score ? 'Tie' : 'Winner' }
          avatar={ winner.profile.avatar_url }
          href={ winner.profile.html_url }
          name={ winner.profile.login }
          subheader={ `Score: ${winner.score.toLocaleString()}` }>
          
          <ProfileList profile={ winner.profile } />
        </Card>
    
        <Card
          header={ loser.score === winner.score ? 'Tie' : 'Loser' }
          avatar={ loser.profile.avatar_url }
          href={ loser.profile.html_url }
          name={ loser.profile.login }
          subheader={ `Score: ${loser.score.toLocaleString()}` }>

          <ProfileList profile={ loser.profile } />
        </Card>
      </div>
      <Link
        to='/battle'
        className='btn btn-dark btn-space text-center'>
        Reset
      </Link>
    </React.Fragment>
  )
}
