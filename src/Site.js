import React from 'react'
import Page from './components/Page/Page'
import LandingAnimation from './components/LandingAnimation/LandingAnimation'

export default class Site extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      animationOver: false,
      showAnimation: true
    }
  }

  handleAnimationOver = () => {
    this.setState({ animationOver: true }, () => {
      setTimeout(() => this.setState({ showAnimation: false }), 600)
    })
  }

  render = () => {
    const { showAnimation, animationOver } = this.state

    const scrollable = showAnimation ? 'overflow-hidden' : 'overflow-scroll'

    return (
      // <div className={`h-screen w-screen ${scrollable} relative`}>
      <div className={`w-screen overflow-hidden relative`}>
        {showAnimation && (
          <LandingAnimation
            animationOver={animationOver}
            onAnimationOver={this.handleAnimationOver}
          />
        )}
        {<Page animationOver={animationOver} />}
      </div>
    )
  }
}
