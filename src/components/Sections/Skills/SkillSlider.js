import React from 'react'
import Translateable from '../../Translateable'

import './SkillSlider.css'

export default class SkillSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      categories: [],
      fadeIn: true
    }

    this.timeout = null
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //     if (prevState.selected !== this.state.selected) {
  //         this.setState({ fadeIn: true })
  //     }
  // }

  getSrcFromName = name => {
    return `${name.toLowerCase().replace(/\s/g, '-')}`
  }

  handleClick = selected => {
    this.setState({ selected, fadeIn: false }, () => {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.setState({ fadeIn: true })
      }, 100)
    })
  }

  render = () => {
    const skills = [],
      categories = []

    this.props.skillData.forEach((item, i) => {
      const selected =
        this.state.selected === i ? 'animated-bottom-border-selected' : ''

      categories.push(
        <li
          key={`skill-${i}`}
          className="w-full font-primary cursor-pointer pl-4 py-3"
          onClick={() => this.handleClick(i)}
        >
          <p
            className={`animated-bottom-border font-bold text-lg md:text-xl lg:text-2xl cursor-pointer ${this.props.underlineColor} ${selected}`}
          >
            <Translateable text={item.category[this.props.language]} />
          </p>
        </li>
      )

      const renderedSkills = item.skills.map((skill, s) => {
        const transitionDelay = `${0.25 + s * 0.2}s`

        const fade = this.state.fadeIn
          ? 'opacity-100 blur-0'
          : 'opacity-0 blur-10'

        if (skill.icon) {
          return (
            <p
              key={`${i}-${s}`}
              className={`font-primary ${fade} transition-all-25 text-center my-5 mx-1`}
              style={{ transitionDelay }}
            >
              {skill.icon}
            </p>
          )
        } else if (skill.src) {
          return (
            <div
              key={`${i}-${s}`}
              className={`transition-all-25 ${fade} my-5 flex flex-col justify-center items-center mx-1 h-24 sm:h-32 lg:h-40`}
              style={{ transitionDelay }}
            >
              <img className="h-full" src={skill.src} />
            </div>
          )
        }
      })

      skills.push(renderedSkills)
    })

    return (
      <div className="hidden sm:flex justify-start items-start w-full pl-12">
        <div className="flex-grow mr-10 md:max-w-sm">
          <ul className="w-full">{categories}</ul>
        </div>
        <div className="w-8/12 skills-grid skills-grid-col-2 skills-grid-col-3">
          {skills[this.state.selected]}
        </div>
      </div>
    )
  }
}
