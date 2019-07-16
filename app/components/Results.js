import React from 'react'
import { battle } from '../utils/api'
import { GoMarkGithub, GoGlobe, GoKeyboard, GoRepoForked, GoTelescope } from "react-icons/go"

export default class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    const { playerOne, playerTwo } = this.props

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
      return <p>Loading</p>
    }

    if (error) {
      return (
        <p className='center-text error'>
          { error }
        </p>
      )
    }

    return(
      <div class='grid space-around container-sm'>
        <div class='card bg-light'>
          <h2 class='header-lg text-center'>
            { winner.score === loser.score ? 'Tie' : 'Winner' }
          </h2>
          <img
            className='avatar'
            src={ winner.profile.avatar_url }
            alt={ `Avatar for ${winner.profile.login}` }
          />
          <h3 className='text-center'>
            Score: { winner.score.toLocaleString() }
          </h3>
          <h4 className='text-center'>
            <a className='link'
              href='{ winner.profile.html_url'>
              { winner.profile.login }
            </a>
          </h4>
          <ul class='card-list'>
            <li>
              <GoMarkGithub
                color='rebeccapurple'
                size={ 14 }
              />
              { winner.profile.name }
            </li>
            {winner.profile.location && (
              <li>
                <GoGlobe
                  color='rebeccapurple'
                  size={ 14 }
                />
                { winner.profile.location }
              </li>
            )}
            {winner.profile.company && (
              <li>
                <GoKeyboard
                  color='rebeccapurple'
                  size={ 14 }
                />
                { winner.profile.company }
              </li>
            )}
            <li>
              <GoRepoForked
                color='rebeccapurple'
                size={ 14 }
              />
              { winner.profile.followers.toLocaleString() } followers
            </li>
            <li>
              <GoTelescope
                color='rebeccapurple'
                size={ 14 }
              />
              { winner.profile.following.toLocaleString() } following
            </li>
          </ul>
        </div>
      
        <div class='card bg-light'>
          <h2 class='header-lg text-center'>
            { loser.score === winner.score ? 'Tie' : 'Loser' }
          </h2>
          <img
            className='avatar'
            src={ loser.profile.avatar_url }
            alt={ `Avatar for ${loser.profile.login}` }
          />
          <h3 className='text-center'>
            Score: { loser.score.toLocaleString() }
          </h3>
          <h4 className='text-center'>
            <a className='link'
              href='{ loser.profile.html_url'>
              { loser.profile.login }
            </a>
          </h4>
          <ul class='card-list'>
            <li>
              <GoMarkGithub
                color='rebeccapurple'
                size={ 14 }
              />
              { loser.profile.name }
            </li>
            {loser.profile.location && (
              <li>
                <GoGlobe
                  color='rebeccapurple'
                  size={ 14 }
                />
                { loser.profile.location }
              </li>
            )}
            {loser.profile.company && (
              <li>
                <GoKeyboard
                  color='rebeccapurple'
                  size={ 14 }
                />
                { loser.profile.company }
              </li>
            )}
            <li>
              <GoRepoForked
                color='rebeccapurple'
                size={ 14 }
              />
              { loser.profile.followers.toLocaleString() } followers
            </li>
            <li>
              <GoTelescope
                color='rebeccapurple'
                size={ 14 }
              />
              { loser.profile.following.toLocaleString() } following
            </li>
          </ul>
        </div>
      </div>
    )
  }
}