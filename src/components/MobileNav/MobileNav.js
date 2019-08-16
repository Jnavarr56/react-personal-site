import React from 'react'
import Translateable from '../Translateable'
import { FaPlus, FaTimes } from 'react-icons/fa'

import './MobileNav.css'

export default class MobileNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      bgColor: 'bg-black',
      fontColor: 'text-white',
      clickable: true,
      current: 0
    }

    this.timeout = null
  }

  handleItemClick = (section, i) => {
    if (!this.state.clickable) return null

    if (!this.state.current === i) {
      this.setState({ open: false })
      return
    }

    const { backgroundColor, innerRef } = section.props

    this.setState({ open: false, current: i, clickable: false }, () => {
      const newBgColor =
        backgroundColor === 'bg-black' ? 'bg-white' : 'bg-black'
      const newFontColor =
        backgroundColor === 'bg-black' ? 'text-black' : 'text-white'

      clearInterval(this.timeout)
      this.timeout = setTimeout(() => {
        this.props.onMove(section.ref.current, innerRef.current, newBgColor, i)

        this.setState(
          {
            bgColor: newBgColor,
            fontColor: newFontColor
          },
          () => setTimeout(() => this.setState({ clickable: true }), 250)
        )
      }, 500)
    })
  }

  render = () => {
    const overlayOpen = this.state.open ? 'mobile-open' : ''
    const containerOpen = this.state.open ? 'mobile-full-menu' : ''

    return (
      <div
        className={`sm:hidden mobile-menu-container ${containerOpen} h-16 w-16 ${this.state.bgColor} transition-all-50`}
      >
        <a
          href="#"
          className="mobile-menu"
          onClick={() => this.setState(state => ({ open: !state.open }))}
        >
          {this.state.open ? (
            <FaTimes
              id="mobile-menu-icon"
              className={`text-md ${this.state.fontColor}`}
            />
          ) : (
            <FaPlus
              id="mobile-menu-icon"
              className={`text-md ${this.state.fontColor}`}
            />
          )}
        </a>
        <div className={`mobile-overlay ${overlayOpen}`}>
          <nav className="mobile-overlay-menu">
            <ul>
              {this.props.sections.map((sec, i) => {
                return (
                  <li key={`mobile-nav-${i}`}>
                    <a
                      className={`mobile-nav-item font-primary transition-all-50 ${this.state.fontColor}`}
                      onClick={() => this.handleItemClick(sec, i)}
                    >
                      <Translateable
                        text={sec.props.title[this.props.language]}
                      />
                    </a>
                  </li>
                )
              })}
              {/* <li><a class="has-alt-text mobile-nav-item" data-eng="Home" data-sp="Inicio" href="#home">Home</a></li>
                    <li><a class="has-alt-text mobile-nav-item" data-eng="About" data-sp="Sobre Mi" href="#about">About</a></li>
                    <li><a class="has-alt-text mobile-nav-item" data-eng="Skills" data-sp="Habilidades" href="#skills">Skills</a></li>
                    <li><a class="has-alt-text mobile-nav-item" data-eng="Portfolio" data-sp="Portfolio" href="#work">Portfolio</a></li>
                    <li><a class="has-alt-text mobile-nav-item" data-eng="Articles" data-sp="Artículos" href="#articles">Articles</a></li>
                    <li><a class="has-alt-text mobile-nav-item" data-eng="Contact" data-sp="Contactame" href="#contact">Contact</a></li> */}
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
