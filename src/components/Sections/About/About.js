import React from 'react'
import Translateable from '../../Translateable'

export default class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.copy = {
      0: {
        english:
          'Master of Science in Comp Sci student + Bootcamp grad currently looking for first developer role. ',
        español:
          'Soy un adicto a los datos que se convirtió en un desarrollador con una pasión por resolver problemas.'
      },
      1: {
        english:
          "I'm a 23 year old NYC based bilingual Full-Stack developer with an Economics degree currently looking for junior/entry level roles in software development or QA. I began with Bootstrap/Ruby on Rails but have transitioned to React.js/Redux and Node.js/Express. I'm highly adaptable and never shy away from a challenge or unfamiliar technology. Take a look a around here for more info and some of my featured work. ",
        español:
          'Soy un desarrollador bilingüe Full-Stack de 23 años con base en la Ciudad de Nueva York con un diploma de Economia. Actualmente en busca de roles de nivel junior / entrada en desarrollo o control de calidad. Comencé con Bootstrap / Rails pero me estoy expandiendo para trabajar con React.JS / Redux y Node.JS. Soy altamente Adaptable y nunca huir de un desafío o tecnología desconocida. Echar un vistazo a por aquí para más información y algunos de mis trabajos destacados.'
      },
      2: {
        english:
          'Think I could be your next great hire? Feel free to contact me for this or anything at all.',
        español:
          'Creo que podría ser tu próximo gran ¿alquiler? No dude en ponerse en contacto conmigo para esto o cualquier cosa en absoluto.'
      },
      3: {
        english: 'Puedes descargar mi curriculum vitae aqui.',
        español: ''
      },
      4: {
        english: 'This site runs on React.js and Tailwind.css.',
        español:
          'Este sitio se ejecuta completamente con React.js y Tailwind.css.'
      }
    }
  }

  render = () => {
    const { fontColor, language } = this.props
    const { copy } = this

    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="w-full px-1 sm:px-3 flex flex-col justify-start">
          <p className={'text-left ' + fontColor}>
            <Translateable text={copy[0][language]} />
          </p>
          <br />
          <p className={'text-left ' + fontColor}>
            <Translateable text={copy[1][language]} />
          </p>
          <br />
          <p className={'text-left ' + fontColor}>
            <Translateable text={copy[2][language]} />
          </p>
          <br />
          <p className={'text-left ' + fontColor}>
            <Translateable text={copy[3][language]} />
          </p>
          <br />
          <p className={'text-left ' + fontColor}>
            <Translateable text={copy[4][language]} />
          </p>
        </div>
      </div>
    )
  }
}
