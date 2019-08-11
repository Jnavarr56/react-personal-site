import React from 'react'
import Translateable from '../Translateable'
import { Waypoint } from 'react-waypoint'
import './Title.css'

export default class Title extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inView: false
    }

    this.translateEl = React.createRef()
  }

  render = () => {
    const style = this.state.inView
      ? 'title-char-in-view'
      : 'title-char-out-of-view'

    const text = this.props.text.split('').map((l, i) => {
      const delay = 0.25 + i * 0.1
      const transitionDelay = this.state.inView ? `${delay}s` : '0s'
      const padding = l === ' ' ? 'ml-3' : ''

      return (
        <span
          key={`c-${i}`}
          className={`inline-block transition-all-25 ${style} ${padding}`}
          style={{ transitionDelay }}
        >
          {l}
        </span>
      )
    })

    return (
      <h3
        className={`${this.props.fontColor} font-thin text-2xl sm:text-5xl pt-8 pl-4 sm:pt-10 sm:pl-16 absolute top-0 left-0`}
      >
        <Translateable ref={this.translateEl} text={text} />
        <Waypoint
          onEnter={() => this.setState({ inView: true })}
          onLeave={() => this.setState({ inView: false })}
        />
      </h3>
    )
  }
}
