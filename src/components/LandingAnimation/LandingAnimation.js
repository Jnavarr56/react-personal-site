import React from 'react'
import ParticleConfig from './ParticleConfig'
import { MdFilterTiltShift } from 'react-icons/md'

export default class LandingAnimation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      percent: 0,
      animationOver: false,
      leaving: false
    }

    this.countUp = null

    this.particleElID = 'landing-particles'
  }

  componentDidMount = () => {
    window.particlesJS(this.particleElID, ParticleConfig)

    this._initCountUp()
  }

  componentDidUpdate = () => {
    if (this.state.percent === 100 && !this.state.animationOver) {
      this._endAnimation()
    } else {
      this._performAnimation()
    }
  }

  componentWillUnmount = () => {
    window.pJSDom = []
  }

  _onAnimationOver = () => {
    setTimeout(this.props.onAnimationOver, this.props.fadeOutDuration)
  }

  _fadeOut = () => {
    setTimeout(() => {
      this.setState({ leaving: true }, this._onAnimationOver)
    }, this.props.fadeOutDelay)
  }

  _endAnimation = () => {
    this.setState({ animationOver: true }, this._fadeOut)
  }

  _performAnimation = () => {
    const { percent } = this.state

    if (percent < 50) {
      this._setSpeed(percent * 2)
    } else if (percent < 100) {
      const speed = this._getSpeed()

      const remainingUnit = speed / (100 - percent)

      this._setSpeed(speed - remainingUnit)
    }
  }

  _getSpeed = () => {
    return window.pJSDom[0].pJS.particles.move.speed
  }

  _setSpeed = speed => {
    window.pJSDom[0].pJS.particles.move.speed = speed
  }

  _incrementPercent = () => {
    this.setState(({ percent }) => ({ percent: percent + 1 }))
  }

  _initCountUp = () => {
    this.countUp = setInterval(() => {
      if (this.state.percent < 100) this._incrementPercent()
      else clearInterval(this.countUp)
    }, this.props.countUpInterval)
  }

  render = () => {
    const opacity = this.state.leaving ? 'opacity-0 blur-10' : ''
    const { transition } = this.props

    return (
      <div
        className={`h-full w-full flex justify-center items-center absolute top-0 left-0 z-9999 ${transition} ${opacity}`}
      >
        <p className="font-primary font-thin text-7xl sm:text-9xl z-50 bg-white-opacity-75">
          {this.state.percent}%
        </p>
        <div
          id={this.particleElID}
          className="h-full w-full absolute top-0 right-0"
        ></div>
      </div>
    )
  }
}
