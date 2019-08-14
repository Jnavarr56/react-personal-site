import React from 'react'

export default class SkillBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
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

    handleClick = index => {
      this.setState(state => ({
        selected: state.selected === index ? null : index
      }))
    }

    return (
      <div className="w-full px-3 flex flex-col justify-center items-start">
        {testProps.map((cat, i) => {
          const height = this.state.selected === i ? 'h-auto ' : 'h-0'

          return (
            <div key={cat.title} onClick={() => null}>
              <div className="w-full py-2 flex justify-start items-center">
                <span className="mr-2">{i}</span>
                <span>{cat.category}</span>
              </div>
              <div
                className={`w-full ${height} overflow-hidden transition-all-50`}
              >
                <ul>
                  {cat.skills.map(skill => (
                    <li key={`${cat.category}${i}`}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
