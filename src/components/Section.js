import React from 'react'
import Title from './Title/Title'
import { Waypoint } from 'react-waypoint'
export default class Section extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeIn: false
    }
  }

  handleFade = fadeIn => {
    if (this.state.fadeIn !== fadeIn) {
      this.setState({ fadeIn })
      console.log('enter')
    }
  }

  render = () => {
    const {
      innerRef,
      children,
      language,
      title,
      backgroundColor,
      page
    } = this.props
    const fontColor =
      backgroundColor === 'bg-red-base' ? 'text-white' : 'text-red-base'

    const fade = this.state.fadeIn
      ? 'opacity-100 blur-0'
      : 'opacity-0 blur-10 scale-small'

    const transition = this.props.transition

    return (
      <section
        className={`h-screen w-screen relative overflow-hidden ${backgroundColor}`}
        ref={innerRef}
      >
        {title && <Title fontColor={fontColor} text={title[language]} />}

        {this.props.fadeable ? (
          <React.Fragment>
            <div
              className={`h-full w-full flex justify-center items-start pt-20 sm:pt-32 md:pt-48 ${transition} ${fade} relative`}
            >
              {React.cloneElement(children, { fontColor, language, page })}
            </div>
            <div className="absolute bottom-0 w-full justify-center items-center">
              <Waypoint
                fireOnRapidScroll={true}
                onEnter={() => this.handleFade(true)}
                onLeave={() => this.handleFade(false)}
              />
            </div>
          </React.Fragment>
        ) : (
          React.cloneElement(children, { fontColor, language, page })
        )}
      </section>
    )
  }
}
