import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { TiUser, TiStarFullOutline, TiFlowChildren, TiSpanner } from 'react-icons/ti'

function LanguageNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='flex-center'>
      {languages.map((language, index) => (
        <li key={ index }>
          <button
            className='btn-clear nav-link'
            onClick={() => onUpdateLanguage(language)}
            style={ language === selected ? { color: 'goldenrod' } : null }>
            { language }
          </button>
        </li>
      ))}
    </ul>
  )
}

LanguageNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid({ repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
        const { login, avatar_url } = owner

        return (
          <li
            key={ name }
            className='repo bg-light'>
            <h4 className='header-lg center-text'>
              #{ index + 1 }
            </h4>
            <img
              className='avatar'
              src={ avatar_url }
              alt={ `Avatar for ${login}` }
            />
            <h2 className='center-text'>
              <a
                className='link'
                href={ html_url }>
                { login }
              </a>
            </h2>
            <ul className='card-list'>
              <li>
                <TiUser
                  color='cadetblue'
                  size={ 16 }
                />
                <a href={ `http://github.com/${login}` }>
                  { login }
                </a>
              </li>
              <li>
                <TiStarFullOutline
                  color='darkorange'
                  size={ 16 }
                />
                { stargazers_count.toLocaleString() } stars
              </li>
              <li>
                <TiFlowChildren
                  color='midnightblue'
                  size={ 16 }
                />
                { forks.toLocaleString() } forks
              </li>
              <li>
                <TiSpanner
                  color='deeppink'
                  size={ 16 }
                />
                { open_issues.toLocaleString() } open issues
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null
    }

    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null
    })

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }))
        })
        .catch((err) => {
          console.warn('Error fetching repos: ', err)
          this.setState({
            error: 'This is an error when fetching the repositories.'
          })
        })
    }
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state

    return !repos[selectedLanguage] && error === null
  }

  render() {
    const { selectedLanguage, repos, error } = this.state
    
    return (
      <React.Fragment>
        <LanguageNav
          selected={ selectedLanguage }
          onUpdateLanguage={ this.updateLanguage }
        />

        { this.isLoading() && <p>LOADING</p> }

        { error && <p>{ error }</p> }

        { repos[selectedLanguage] && <ReposGrid repos={ repos[selectedLanguage] } /> }
      </React.Fragment>
    )
  }
}