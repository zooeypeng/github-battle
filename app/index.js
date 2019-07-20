import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import { ThemeProvider } from './contexts/theme'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: 'light',
      toggerTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'dark' ? 'light' : 'dark'
        }))
      }
    }
  }

  render() {
    return (
      <ThemeProvider value={ this.state }>
        <div className="container">
          <Battle />
          {/* <Popular /> */}
        </div>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app') 
)