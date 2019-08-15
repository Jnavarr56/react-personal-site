import React from 'react'
import Translateable from '../../../Translateable'
import { IoIosArrowDroprightCircle } from 'react-icons/io'

export default class SkillCategory extends React.Component {
  constructor(props) {
    super(props)

    this.skillsContainer = React.createRef()
  }

  render = () => {
    const height = this.props.selected
      ? this.skillsContainer.current.clientHeight
      : 0
    const borderBottomColor =
      this.props.headerBgColor === 'bg-red-base'
        ? 'border-white'
        : 'border-red-base'
    const rotate = this.props.selected ? 'rotate-right-90' : ''

    return (
      <div
        className="w-full"
        onClick={() => this.props.onClick(this.props.index)}
      >
        <div
          className={`w-full py-2 pl-2 flex justify-start items-center ${this.props.headerBgColor} border-b ${borderBottomColor}`}
        >
          <IoIosArrowDroprightCircle
            className={`mr-2 ${this.props.headerFontColor} transition-all-25rs ${rotate}`}
          />
          <span className={this.props.headerFontColor}>
            <Translateable text={this.props.category[this.props.language]} />
          </span>
        </div>
        <div
          className="w-full overflow-hidden transition-all-50"
          style={{ height }}
        >
          <ul ref={this.skillsContainer}>
            {this.props.skills.map((skill, i) => (
              <li key={`${i}`} className="font-primary">
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
