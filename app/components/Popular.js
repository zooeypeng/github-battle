import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

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
              [selectedLanguage]: data // marge them
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

        { repos[selectedLanguage] && <pre>{ JSON.stringify(repos[selectedLanguage], null, 2) }</pre> }
      </React.Fragment>
    )
  }
}