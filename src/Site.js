import React from 'react'
import Page from './components/Page/Page'
import LandingAnimation from './components/LandingAnimation/LandingAnimation'

export default class Site extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fadePageIn: false
    }
  }

  componentDidMount = () => {
    this._setVisited()
  }

  _getVisited = () => {
    return window.localStorage.getItem('visitedJorge')
  }

  _setVisited = () => {
    window.localStorage.setItem('visitedJorge', Date.now())
  }

  handleAnimationOver = () => {
    this.setState({ animationOver: true }, () => {
      setTimeout(() => this.setState({ showAnimation: false }), 600)
    })
  }

  render = () => {
    return (
      <div className={`h-screen w-screen overflow-y-scroll relative`}>
        {this._getVisited() ? (
          <Page />
        ) : (
          <LandingAnimation
            countUpInterval={20}
            fadeOutDelay={10000}
            fadeOutDuration={5000}
            transition={'transition-all-50'}
            onAnimationOver={this.handleAnimationOver}
          />
        )}
      </div>
    )
  }
}
