import React from 'react'
import PropTypes from 'prop-types'

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeIn: false,
      fadeOut: false,
      render: false
    }
    this.container = React.createRef()
    this.fadeTimeout = null
  }

  componentDidUpdate = prevProps => {
    if (!prevProps.open && this.props.open) {
      // clearTimeout(this.fadeTimeout)
      // this.fadeTimeout = setTimeout(() => {
      //   this.setState({ render: true })
      // }, 250)

      this.setState({ render: true }, () => {
        setTimeout(() => {
          this.setState({ fadeIn: true })
        }, 250)
      })
    } else if (prevProps.open && !this.props.open) {
      this.setState({ fadeIn: false }, () => {
        setTimeout(() => {
          this.setState({ render: false })
        }, 500)
      })
    }
  }

  overlayClick = () => {
    if (this.props.overlayClickable) this.props.onClose()
  }

  render = () => {
    if (!this.state.render) return null

    const fade = this.state.fadeIn ? 'opacity-100 blur-0' : 'opacity-0 blur-10'

    return (
      <div className="fixed inset-0 overflow-auto h-screen w-screen flex justify-center items-center z-99999">
        <div
          onClick={this.overlayClick}
          className="h-full w-full bg-black opacity-50 z-9000"
        ></div>
        <div
          className={`absolute flex flex-col justify-start items-center z-99999 transition-all-50 ${fade}`}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

Modal.defaultProps = {
  overlayClickable: false
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  overlayClickable: PropTypes.bool
}
