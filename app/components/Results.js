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

export default class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }

  componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(this.props.location.search)

    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        })
      }).catch(({ message }) => {
        this.setState({
          error: message,
          loading: false
        })
      })
  }

  render() {
    const { winner, loser, error, loading } = this.state

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

    return(
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
}