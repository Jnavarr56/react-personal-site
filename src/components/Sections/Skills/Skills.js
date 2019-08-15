import React from 'react'
import SkillBox from './SkillBox/SkillBox'
import SkillSlider from './SkillSlider'
import graphql from './graphql.png'
import next from './next.png'
import npm from './npm.png'
import tailwindcss from './tailwindcss.png'
import vagrant from './vagrant.png'

export default class Skills extends React.Component {
  constructor(props) {
    super(props)

    this.skillData = [
      {
        category: {
          english: 'Programming Languages',
          español: 'Lenguajes de Programación'
        },
        skills: [
          {
            name: 'Java',
            icon: <i class="devicon-java-plain-wordmark colored text-11xl"></i>
          },
          {
            name: 'Ruby',
            icon: <i class="devicon-ruby-plain-wordmark colored text-11xl"></i>
          },
          {
            name: 'JavaScript',
            icon: <i class="devicon-javascript-plain colored text-11xl"></i>
          }
        ]
      },
      {
        category: {
          english: 'Frameworks/Libraries',
          español: 'Bibliotecas y Frameworks'
        },
        skills: [
          {
            name: 'React.js',
            icon: (
              <i class="devicon-react-original-wordmark colored text-11xl"></i>
            )
          },
          { name: 'React-Native' },
          {
            name: 'Node.js',
            icon: (
              <i class="devicon-nodejs-plain-wordmark colored text-11xl"></i>
            )
          },
          {
            name: 'Express.js',
            icon: (
              <i class="devicon-express-original-wordmark colored text-11xl"></i>
            )
          },
          { name: 'Next.js:', src: next },
          { name: 'TailwindCSS', src: tailwindcss },
          {
            name: 'Ruby on Rails',
            icon: <i class="devicon-rails-plain-wordmark colored text-11xl"></i>
          },
          {
            name: 'jQuery',
            icon: (
              <i class="devicon-jquery-plain-wordmark colored text-11xl"></i>
            )
          },
          {
            name: 'Bootstrap',
            icon: (
              <i class="devicon-bootstrap-plain-wordmark colored text-11xl"></i>
            )
          }
        ]
      },
      {
        category: {
          english: 'Databases',
          español: 'Bases de Datos'
        },
        skills: [
          {
            name: 'mongoDB',
            icon: (
              <i class="devicon-mongodb-plain-wordmark colored text-11xl"></i>
            )
          },
          {
            name: 'PostgreSQL',
            icon: (
              <i class="devicon-postgresql-plain-wordmark colored text-11xl"></i>
            )
          }
        ]
      },
      {
        category: {
          english: 'Prior Experience',
          español: 'Experiencia Previa'
        },
        skills: [
          { name: 'GraphQL', src: graphql },
          { name: 'Vagrant', src: vagrant },
          {
            name: 'Docker',
            icon: (
              <i class="devicon-docker-plain-wordmark colored text-11xl"></i>
            )
          },
          {
            name: 'AWS S3',
            icon: (
              <i class="devicon-amazonwebservices-plain-wordmark colored text-11xl"></i>
            )
          }
        ]
      },
      {
        category: {
          english: 'Other',
          español: 'Misceláneo'
        },
        skills: [
          {
            name: 'Git',
            icon: <i class="devicon-git-plain-wordmark colored text-11xl"></i>
          },
          { name: 'npm', src: npm }
        ]
      }
    ]
  }

  render = () => {
    let headerFontColor, headerBgColor, underlineColor
    if (this.props.fontColor === 'text-red-base') {
      headerFontColor = 'text-white'
      headerBgColor = 'bg-red-base'
      underlineColor = 'animated-bottom-border-red'
    } else {
      headerFontColor = 'text-red-base'
      headerBgColor = 'bg-white'
      underlineColor = 'animated-bottom-border-white'
    }

    return (
      <React.Fragment>
        <SkillBox
          skillData={this.skillData}
          language={this.props.language}
          headerFontColor={headerFontColor}
          headerBgColor={headerBgColor}
        />
        <SkillSlider
          underlineColor={underlineColor}
          skillData={this.skillData}
          language={this.props.language}
        />
      </React.Fragment>
    )
  }
}
