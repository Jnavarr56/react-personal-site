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
      <div className="w-full absolute pl-4 pt-4 sm:pl-12 sm:pt-12 top-0 overflow-hidden hidden sm:block">
        <h3 className={`${this.props.fontColor} text-2xl sm:text-5xl`}>
          <Translateable ref={this.translateEl} text={text} />
          <Waypoint
            onEnter={() => this.setState({ inView: true })}
            onLeave={() => this.setState({ inView: false })}
          />
        </h3>
      </div>
    )
  }
}
