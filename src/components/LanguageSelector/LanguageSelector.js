import React from 'react'
import Switch from 'react-switch'

import eng from './eng-icon.png'
import esp from './esp-icon.png'

import './LanguageSelector.css'

class LanguageSelector extends React.Component {
  constructor(props) {
    super(props)

    this.flags = [eng, esp]
  }

  _setBackground = () => {
    document.getElementsByClassName(
      'react-switch-handle'
    )[0].style.backgroundImage = `url('${this.flags[this.props.language]}')`
    document.getElementsByClassName(
      'react-switch-handle'
    )[0].style.backgroundColor = `transparent`
    document.getElementsByClassName(
      'react-switch-handle'
    )[0].style.backgroundSize = `cover`
  }

  componentDidMount = () => {
    this._setBackground()
  }

  componentDidUpdate = () => {
    this._setBackground()
  }

  render = () => {
    const { transition, opacity } = this.props
    return (
      <div
        className={`fixed top-0 right-0 z-999999 flex justify-center items-center pt-5 pr-5 sm:pt-12 sm:pr-24 ${transition} ${opacity}`}
      >
        <Switch
          checked={this.props.language ? true : false}
          onChange={this.props.onChange}
          onColor="#000000"
          offColor="#000000"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
        />
      </div>
    )
  }
}

export default LanguageSelector
