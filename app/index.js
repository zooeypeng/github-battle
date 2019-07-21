import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import Nav from './components/Nav'
import { ThemeProvider } from './contexts/theme'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'dark' ? 'light' : 'dark'
        }))
      }
    }
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={ this.state }>
          <div className={ this.state.theme }>
            <div className="container">
              <Nav />
              <Route exact path='/' component={ Popular } />
              <Route path='/battle' component={ Battle } />
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app') 
)