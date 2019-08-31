import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { TiUser, TiStarFullOutline, TiFlowChildren, TiSpanner } from 'react-icons/ti'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

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
          <li key={ name }>
            <Card
              header={ `#${index + 1}` }
              avatar={ avatar_url }
              href={ html_url }
              name={ login }>
              
              <ul className='card-list'>
                <li>
                  <Tooltip text='Github Username'>
                    <TiUser
                      color='cadetblue'
                      size={ 16 }
                      />
                    <a href={ `http://github.com/${login}` }>
                      { login }
                    </a>
                  </Tooltip>
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
                    color='sienna'
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
            </Card>
          </li>
        )
      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

function popularReducer (state, action) {
  switch (action.type) {
    case 'success':
      return {
        ...state,
        [action.selectedLanguage]: action.repos,
        error: null
      }
    case 'fail':
      return {
        ...state,
        error: action.error.message
      }
    default:
      throw new Error(`This action type is not support.`);
  }
}

export default function Popular () {
  const [ selectedLanguage, setSelectedLanguage ] = React.useState('All')
  const [ state, dispatch ] = React.useReducer(
    popularReducer,
    { error: null }
  )

  const fetchLanguages = React.useRef([])

  React.useEffect(() => {
    if (fetchLanguages.current.includes(selectedLanguage) === false) {
      fetchLanguages.current.push(selectedLanguage)

      fetchPopularRepos(selectedLanguage)
        .then((repos) => dispatch({ type: 'success', selectedLanguage, repos }))
        .catch((error) => dispatch({ type: 'fail', error }))
    }
  }, [ fetchLanguages, selectedLanguage ])

  const isLoading = () => !state[selectedLanguage] && state.error === null

  return (
    <React.Fragment>
      <LanguageNav
        selected={ selectedLanguage }
        onUpdateLanguage={setSelectedLanguage}
      />

      { isLoading() && <Loading text='Fetching Repos' /> }

      { state.error && <p className='text-center error'>{ state.error }</p> }

      { state[selectedLanguage] && <ReposGrid repos={ state[selectedLanguage] } /> }
    </React.Fragment>
  )
}
