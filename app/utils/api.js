const id = 'YOUR_CLIENT_ID'
const sec = 'YOUR_SECRET_ID'
const params = `?client_id=${id}&client_secret=${sec}`

function getErrorMsg(message, username) {
  if (message === 'Not found') {
    return `${username} doesn't exist`
  }

  return message
}

function getProfile(username) {
  return fetch(`http://api.github.com/users/${username}${params}`)
    .then((res) => res.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username))
      }

      return profile
    })
}

function getRepos(username) {
  return fetch(`http://api.github.com/users/${username}/repos${params}$per_page=100`)
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMsg(repo.message, username))
      }

      return repos
    })
}

function getStartCount(repos) {
  return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0)
}

function calculateScore({followers, following}, repos) {
  return (followers * 3) + getStartCount(repos) + (following * 2)
}

function getPlayer(player) {
  return Promise.all([
    getProfile(player),
    getRepos(player)
  ]).then(([profile, repos]) => ({
    profile,
    score: calculateScore(profile, repos)
  }))
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score )
}

export function battle(players) {
  return Promise.all([
    getPlayer(players[0]),
    getPlayer(players[1])
  ]).then((results) => sortPlayers(results))
}

export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message)
      }

      return data.items
    })
}