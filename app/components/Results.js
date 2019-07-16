import React from 'react'
import { battle } from '../utils/api'
import { GoMarkGithub, GoGlobe, GoKeyboard, GoRepoForked, GoTelescope } from "react-icons/go"
import Card from './Card'

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
      <div className='grid space-around container-sm'>
        <Card
          header={ winner.score === loser.score ? 'Tie' : 'Winner' }
          avatar={ winner.profile.avatar_url }
          href={ winner.profile.html_url }
          name={ winner.profile.login }
          subheader={ `Score: ${winner.score.toLocaleString()}` }>
          
          <ul className='card-list'>
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
        </Card>
    
        <Card
          header={ loser.score === winner.score ? 'Tie' : 'Loser' }
          avatar={ loser.profile.avatar_url }
          href={ loser.profile.html_url }
          name={ loser.profile.login }
          subheader={ `Score: ${loser.score.toLocaleString()}` }>

          <ul className='card-list'>
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
        </Card>
      </div>
    )
  }
}