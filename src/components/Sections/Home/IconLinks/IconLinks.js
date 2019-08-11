import React from 'react'
import Icon from './Icon'
import blackCodepen from './logos/black/codepenlogo.png'
import redCodepen from './logos/red/codepenlogo.png'
import blackGithub from './logos/black/githublogo.png'
import redGithub from './logos/red/githublogo.png'
import blackAngellist from './logos/black/angellistlogo.png'
import redAngellist from './logos/red/angellistlogo.png'
import blackLinkedinlogo from './logos/black/linkedinlogo.png'
import redLinkedinlogo from './logos/red/linkedinlogo.png'

export default class IconsLinks extends React.Component {
  constructor(props) {
    super(props)

    this.icons = [
      {
        normal: blackCodepen,
        hover: redCodepen,
        alt: 'codepen',
        link: 'https://codepen.io/collection/DQvVZN/'
      },
      {
        normal: blackGithub,
        hover: redGithub,
        alt: 'github',
        link: 'https://github.com/Jnavarr56'
      },
      {
        normal: blackAngellist,
        hover: redAngellist,
        alt: 'angellist',
        link: 'https://angel.co/jorge-navarro'
      },
      {
        normal: blackLinkedinlogo,
        hover: redLinkedinlogo,
        alt: 'linkedin',
        link: 'https://www.linkedin.com/in/jnavarr5/'
      }
    ]
  }

  render = () => {
    return (
      <div className="z-50 flex justify-center items-start fixed bottom-0 inset-x-0 pb-5 sm:top-0 sm:left-0 sm:right-auto sm:bottom-auto sm:pt-10 sm:pl-24">
        {this.icons.map((props, i) => (
          <Icon key={`icon-${i}`} {...props} />
        ))}
      </div>
    )
  }
}
