import React from 'react'
import Section from '../Sections/Section'
import Home from '../Sections/Home/Home'
import LanguageSelector from './LanguageSelector/LanguageSelector'

export default class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      language: 0
    }

    this.languages = ['english', 'español']

    this.sections = [{ section: <Home />, ref: React.createRef() }]
  }

  toggleLanguage = () => {
    this.setState(state => ({ language: state.language ? 0 : 1 }))
  }

  getOpacity = () => {
    return this.props.animationOver ? 'opacity-100 blur-0' : 'opacity-0 blur-10'
  }

  renderSectionWithLanguage = section => {
    return React.cloneElement(section, {
      language: this.languages[this.state.language]
    })
  }

  render = () => {
    return (
      <div
        className={`w-screen relative transition-all-50 ${this.getOpacity()}`}
      >
        <LanguageSelector
          language={this.languages[this.state.language]}
          toggle={this.toggleLanguage}
        />

        {this.sections.map((s, i) => {
          return (
            <Section
              key={`section-${i}`}
              innerRef={s.ref}
              styleClasses={i % 2 ? 'bg-red-base' : 'bg-white'}
            >
              {this.renderSectionWithLanguage(s.section)}
            </Section>
          )
        })}
      </div>
    )
  }
}
