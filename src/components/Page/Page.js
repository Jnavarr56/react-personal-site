import React from 'react'
import Section from '../Sections/Section'
import Home from '../Sections/Home/Home'
import About from '../Sections/About/About'
import LanguageSelector from './LanguageSelector/LanguageSelector'

export default class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      language: 0
    }

    this.languages = ['english', 'español']

    this.sections = [
      { section: <Home />, ref: React.createRef() },
      { section: <About />, ref: React.createRef() }
    ]
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
      <React.Fragment>
        {this.props.animationOver && (
          <LanguageSelector
            language={this.languages[this.state.language]}
            toggle={this.toggleLanguage}
          />
        )}
        <div
          className={`h-screen w-screen relative transition-all-50 ${this.getOpacity()} overflow-y-scroll`}
        >
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
      </React.Fragment>
    )
  }
}
