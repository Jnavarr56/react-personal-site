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
    const testProps = [
      {
        category: 'Programming Languages',
        skills: ['Java', 'Ruby', 'JavaScript']
      },
      {
        category: 'Frameworks/Libraries',
        skills: [
          'React.js',
          'Node.js',
          'Express.js',
          'Next.js',
          'TailwindCSS',
          'Ruby on Rails',
          'jQuery',
          'Bootstrap'
        ]
      },
      {
        category: 'Databases',
        skills: ['mongoDB', 'PostgreSQL']
      },
      {
        category: 'Prior Experience',
        skills: ['GraphQL', 'Vagrant', 'Docker']
      },
      {
        category: 'Other',
        skills: ['Git', 'npm']
      }
    ]

    return (
      <div className="w-full px-3 flex flex-col justify-center items-start">
        {testProps.map((item, index) => (
          <SkillCategory
            fontColor={this.props.fontColor}
            bgColor={this.props.bgColor}
            onClick={this.handleClick}
            key={`skill-${index}`}
            selected={index === this.state.selected}
            index={index}
            {...item}
          />
        ))}
      </div>
    )
  }
}
