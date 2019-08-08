import React from 'react'
import './FlashButton.css'

export default class FlashButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickSonar: {}
    }
  }

  componentDidUpdate = () => {
    if (Object.keys(this.state.clickSonar).length) {
      setTimeout(() => {
        this.setState({ clickSonar: {} }, () => {
          this.props.onClick()
        })
      }, 500)
    }
  }

  handleClick = e => {
    const rect = e.currentTarget.getBoundingClientRect()

    const clickSonar = {
      x: `${((e.clientX - rect.left) / e.currentTarget.offsetWidth) * 100}%`,
      y: `${((e.clientY - rect.top) / e.currentTarget.offsetHeight) * 100}%`
    }

    this.setState({ clickSonar })
  }

  render = () => {
    const clickProp = {}
    if (!Object.keys(this.state.clickSonar).length)
      clickProp.onClick = this.handleClick

    const cursor = !Object.keys(this.state.clickSonar).length
      ? 'cursor-pointer'
      : 'cursor-auto'

    return (
      <button
        {...clickProp}
        className={`${this.props.className} focus:outline-none overflow-hidden relative ${cursor}`}
      >
        {this.props.children}
        {this.state.clickSonar.x && (
          <div
            className="click-sonar"
            style={{
              left: this.state.clickSonar.x,
              top: this.state.clickSonar.y
            }}
          ></div>
        )}
      </button>
    )
  }
}
