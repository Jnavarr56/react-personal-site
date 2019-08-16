import React from 'react'
import Section from './Section'
import LanguageSelector from './LanguageSelector/LanguageSelector'
import MobileNav from './MobileNav/MobileNav'
import zenScroll from 'zenscroll'
// const scrollToElement = require('scroll-to-element')

export default class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      language: 0,
      fadeIn: false,
      moving: false,
      selectorColor: 'bg-black',
      sections: []
    }

    this.page = React.createRef()

    this.languages = ['english', 'español']

    this.timeout = null
  }

  componentDidMount = () => {
    window.addEventListener('resize', () => {
      this.page.current.scrollTo(0, 0)
    })
    setTimeout(() => {
      this.setState({
        fadeIn: true,
        sections: this._renderSections()
      })
    }, 500)
  }

  handleMove = (secRef, innerRef, selectorColor, index) => {
    this.state.sections.forEach(section =>
      section.ref.current.handleFade(false)
    )

    const scroller = zenScroll.createScroller(this.page.current, null, 0)

    scroller.to(innerRef, 250, () => {
      setTimeout(() => {
        secRef.handleFade(true)
        this.setState({ selectorColor })
      }, 250)
    })
  }

  _getLanguage = () => {
    return this.languages[this.state.language]
  }

  _renderSections = () => {
    return this.props.sections.map((s, i) => {
      const sectionProps = {
        backgroundColor: i % 2 ? 'bg-black' : 'bg-white',
        language: this._getLanguage(),
        title: s.title,
        showTitle: s.showTitle,
        page: this.page,
        fadeable: i ? true : false,
        transition: 'transition-all-50',
        ref: React.createRef(),
        innerRef: React.createRef()
      }

      return (
        <Section key={`section-${i}`} {...sectionProps}>
          {s.section}
        </Section>
      )
    })
  }

  handleLanguageChange = language => {
    this.setState({ language: language ? 1 : 0 }, () => {
      this.setState({ sections: this._renderSections() })
    })
  }

  render = () => {
    const opacity = this.state.fadeIn
      ? 'opacity-100 blur-0'
      : 'opacity-0 blur-10'

    const { transition } = this.props

    return (
      <React.Fragment>
        <LanguageSelector
          language={this.state.language}
          onChange={this.handleLanguageChange}
          transition={transition}
          opacity={opacity}
          bgColor={this.state.selectorColor}
        />
        <MobileNav
          scrollableAncestor={this.page}
          language={this.languages[this.state.language]}
          sections={this.state.sections}
          onMove={this.handleMove}
        />
        <div
          ref={this.page}
          className={`h-screen w-screen ${transition} ${opacity} overflow-hidden scroll-smooth`}
        >
          {this.state.sections}
        </div>
      </React.Fragment>
    )
  }
}
