import React from 'react'
import { GiBodySwapping, GiBeamsAura, GiCrenelCrown } from 'react-icons/gi'

function Instructions() {
  return (
    <div className='instruction-contaienr'>
      <h1 className='header-lg center-text'>
        Instructions
      </h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>
            Enter two Github users
          </h3>
          <GiBodySwapping
            className='bg-light'
            color=''
            size={ 100 }
          />
        </li>
        <li>
          <h3 className='header-sm'>
            Battle
          </h3>
          <GiBeamsAura
            className='bg-light'
            color=''
            size={ 100 }
          />
        </li>
        <li>
          <h3 className='header-sm'>
            See the winner
          </h3>
          <GiCrenelCrown
            className='bg-light'
            color=''
            size={ 100 }
          />
        </li>
      </ol>
    </div>
  )
}

export default class Battle extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Instructions />
      </React.Fragment>
    )
  }
}