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
      { normal: blackCodepen, hover: redCodepen },
      { normal: blackGithub, hover: redGithub },
      { normal: blackAngellist, hover: redAngellist },
      { normal: blackLinkedinlogo, hover: redLinkedinlogo }
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
