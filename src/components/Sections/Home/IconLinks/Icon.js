import React from 'react'

export default class Icon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: 'normal'
    }
  }

  handleMouseover = () => {
    const active = this.state.active === 'normal' ? 'hover' : 'normal'

    this.setState({ active })
  }

  render = () => {
    const shiftDown = this.state.active === 'normal' ? '' : 'pt-3'

    return (
      <div className={`transition-all-25 ${shiftDown}`}>
        <a href={this.props.link}>
          <img
            className="h-16 w-16 sm:h-16 sm:w-16 cursor-pointer mr-1"
            src={this.props[this.state.active]}
            onMouseLeave={this.handleMouseover}
            onMouseOver={this.handleMouseover}
            alt={this.props.alt}
          />
        </a>
      </div>
    )
  }
}
