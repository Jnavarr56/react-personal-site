import React from 'react'
import SkillCategory from './SkillCategory'

export default class SkillBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }

    this.skillsContainer = React.createRef()
  }

  handleClick = index => {
    this.setState(state => ({
      selected: state.selected === index ? null : index
    }))
  }

  render = () => {
    return (
      <div className="w-full px-3 flex flex-col justify-center items-start sm:hidden">
        {this.props.skillData.map((item, index) => (
          <SkillCategory
            headerFontColor={this.props.headerFontColor}
            headerBgColor={this.props.headerBgColor}
            onClick={this.handleClick}
            key={`skill-${index}`}
            language={this.props.language}
            selected={index === this.state.selected}
            index={index}
            {...item}
          />
        ))}
      </div>
    )
  }
}
