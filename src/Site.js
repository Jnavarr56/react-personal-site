import React from 'react'
import LandingAnimation from './components/LandingAnimation/LandingAnimation'
import Page from './components/Page'
import Home from './components/Sections/Home/Home'
import About from './components/Sections/About/About'
import Skills from './components/Sections/Skills/Skills'

export default class Site extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fadePageIn: false
    }
  }

  componentDidMount = () => {
    this._setVisited()
  }

  _getVisited = () => {
    return window.localStorage.getItem('visitedJorge')
  }

  _setVisited = () => {
    window.localStorage.setItem('visitedJorge', Date.now())
  }

  handleAnimationOver = () => {
    this.setState({ animationOver: true }, () => {
      setTimeout(() => this.setState({ showAnimation: false }), 600)
    })
  }

  render = () => {
    const sections = [
      { section: <Home /> },
      {
        section: <About transition={'transition-all-50'} />,
        title: {
          english: 'About',
          español: 'Sobre Mi'
        }
      },
      {
        section: <Skills transition={'transition-all-50'} />,
        title: {
          english: 'Skills',
          español: 'Habilidades'
        }
      }
    ]

    return (
      <div className={`h-screen w-screen overflow-hidden relative`}>
        {this._getVisited() ? (
          <Page
            transition={'transition-all-50'}
            scrollable={true}
            sections={sections}
          />
        ) : (
          <LandingAnimation
            countUpInterval={35}
            fadeOutDelay={250}
            fadeOutDuration={500}
            transition={'transition-all-50'}
            onAnimationOver={this.handleAnimationOver}
          />
        )}
      </div>
    )
  }
}
