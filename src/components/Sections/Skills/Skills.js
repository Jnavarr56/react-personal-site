import React from 'react'
import SkillBox from './SkillBox'

export default class Skills extends React.Component {
  constructor(props) {
    super(props)
  }

  render = () => {
    console.log(this.props)
    const bgColor =
      this.props.fontColor === 'text-red-base' ? 'bg-red-base' : 'bg-white'
    return (
      <SkillBox
        language={this.props.language}
        fontColor={this.props.fontColor}
        bgColor={bgColor}
      />
    )
  }
}
