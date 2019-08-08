import React from 'react'
import PropTypes from 'prop-types'

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
  }

  overlayClick = () => {
    if (this.props.overlayClickable) this.props.onClose()
  }

  render = () => {
    const { open, onClose } = this.props
    if (!open) return null

    return (
      <React.Fragment>
        <div className="fixed inset-0 overflow-auto h-screen w-screen flex justify-center items-center z-99999">
          <div
            onClick={this.overlayClick}
            className="h-full w-full bg-black opacity-50 z-9000"
          ></div>
          <div className="absolute flex flex-col justify-start items-center z-99999">
            {this.props.children}
          </div>
        </div>
      </React.Fragment>
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
