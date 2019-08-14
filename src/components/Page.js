import React from 'react'
import Section from './Section'
import LanguageSelector from './LanguageSelector/LanguageSelector'

export default class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      language: 0,
      fadeIn: false,
      sections: []
    }

    this.page = React.createRef()

    this.languages = ['english', 'español']
  }

  componentDidMount = () => {
    const sections = this._withRefs(this.props.sections)

    setTimeout(() => {
      this.setState({ fadeIn: true, sections })
    }, 500)
  }

  _withRefs = secs => {
    return secs.map(s => Object.assign(s, { ref: React.createRef() }))
  }

  _getLanguage = () => {
    return this.languages[this.state.language]
  }

  _renderSections = () => {
    return this.state.sections.map((s, i) => {
      const sectionProps = {
        innerRef: s.ref,
        backgroundColor: i % 2 ? 'bg-red-base' : 'bg-white',
        language: this._getLanguage(),
        title: s.title,
        page: this.page,
        fadeable: i ? true : false,
        transition: 'transition-all-50'
      }

      return (
        <Section key={`section-${i}`} {...sectionProps}>
          {s.section}
        </Section>
      )
    })
  }

  handleLanguageChange = language => {
    this.setState({ language: language ? 1 : 0 })
  }

  render = () => {
    const opacity = this.state.fadeIn
      ? 'opacity-100 blur-0'
      : 'opacity-0 blur-10'

    const scroll = this.props.scrollable
      ? 'overflow-y-scroll'
      : 'overflow-hidden'

    const { transition } = this.props

    return (
      <React.Fragment>
        <LanguageSelector
          language={this.state.language}
          onChange={this.handleLanguageChange}
          transition={transition}
          opacity={opacity}
        />
        <div
          ref={this.page}
          className={`h-screen w-screen overflow-x-hidden  ${transition} ${opacity} ${scroll}`}
        >
          {this._renderSections()}
        </div>
      </React.Fragment>
    )
  }
}
