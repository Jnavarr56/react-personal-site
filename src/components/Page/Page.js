import React from 'react'
import Section from '../Sections/Section'
import LanguageSelector from './LanguageSelector/LanguageSelector'

export default class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      language: 0,
      fadeIn: false,
      sections: []
    }

    this.languages = ['english', 'español']
  }

  componentDidMount = () => {
    const sections = this._withRefs(this.props.sections)

    this.setState({ fadeIn: true, sections })
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
        title: null
      }

      return <Section {...sectionProps}>{s.section}</Section>
    })
  }

  handleLanguageChange = () => {
    this.setState(({ language }) => ({ language: language ? 0 : 1 }))
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
      <div className={`h-screen w-screen ${transition} ${opacity} ${scroll}`}>
        {this._renderSections()}
      </div>
    )
  }
}
