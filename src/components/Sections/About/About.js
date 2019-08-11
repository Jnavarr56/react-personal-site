import React from 'react'
import Translateable from '../../Translateable'
import SwipeableViews from 'react-swipeable-views'
// import Pagination from 'react-swipeable-views-utils/com/

export default class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.copy = {
      0: {
        english: 'Swipe left to learn more!',
        español: '¡Deslizar hacia la izquierda para ver más!'
      },
      1: {
        english:
          "I'm a 23 year old, bilingual, MS in Comp Sci candidate and Bootcamp grad with a React.js/Node.js internship under my belt.",
        español:
          'Soy un candidato para maestría en ciencias de la ciencias de la computación y que acabo de terminar una pasantía "full stack" (React.js/Node.js).'
      },
      2: {
        english:
          "I'm based in NYC and looking for full-stack opportunities, but am totally open to QA/front-end engineering positions.",
        español:
          'Vivo en Nueva York y estoy buscando opportunidades full stack pero tambie estoy abierto a positiones de control de calidad o en ingenieria "front-end".'
      },
      3: {
        english:
          "Besides my software development internship experience, I have experience in corporate restructuring and a bachelor's degree in Economics.",
        español:
          'He trabajado en reestructuración corporativa y hice la liceniatura en Economia.'
      },
      4: {
        english:
          'I began with Ruby on Rails but have since migrated to a JavaScript based stack.',
        español:
          'Empecé con "Ruby on Rails" pero ahora trabajo con un "stack" basado en JavaScript.'
      },
      5: {
        english:
          "Most recently, I've been focusing on Next.js, GraphQL, Tailwind.css, and learning about Hooks in React 16.8.",
        español:
          'Recientemente, me he enfocado en Next.js, GraphQL, Tailwind.css y aprender acerca de "Hooks" en React 16.8.'
      },
      6: {
        english:
          "I've built production components in React-Native and would love to expand my mobile development skills.",
        español:
          'He trabajdo en "components" por un producto en React-Native y quisiera expandir mi capacidad de desarrollo móvil.'
      },
      7: {
        english:
          'Think I could be your next great hire? Feel free to reach out!',
        español: '¿Crees que podría ser tu próxima gran contratación?'
      },
      8: {
        english:
          'This site was built with Create-React-App and a number of libraries you can find at this repo.',
        español: 'Esta pagina se hico con Create-React-App.'
      }
    }
  }

  render = () => {
    const { fontColor, language } = this.props
    const { copy } = this

    return (
      <div className="h-full w-full flex justify-center items-start pt-20 sm:pt-32">
        <div className="w-full flex items-center justify-center sm:hidden px-3">
          {/* <p className={'text-left text-sm ' + fontColor}>
            <Translateable text={copy[0][language]} />
            <br /><br />
            <Translateable text={copy[1][language]} />
            <br /><br />
            <Translateable text={copy[2][language]} />
            <br /><br />
            <Translateable text={copy[3][language]} />
            <br /><br />
            <Translateable text={copy[4][language]} />
          </p> */}

          {/* <p className={'text-left text-sm ' + fontColor}>
            <Translateable text={copy[0][language]} />
            <br /><br />
            <Translateable text={copy[1][language]} />
            <br /><br />
            <Translateable text={copy[2][language]} />
            <br /><br />
            <Translateable text={copy[3][language]} />
            <br /><br />
            <Translateable text={copy[4][language]} />
          </p> */}

          <SwipeableViews enableMouseEvents={true} circular={true}>
            <div className="pt-5">
              <p className={fontColor}>
                <Translateable fontColor={fontColor} text={copy[1][language]} />
                <br />
                <br />
                <Translateable fontColor={fontColor} text={copy[3][language]} />
                <br />
                <br />
                <Translateable fontColor={fontColor} text={copy[2][language]} />
                <br />
                <br />
                <em className="font-bold">
                  <Translateable
                    fontColor={fontColor}
                    text={copy[0][language]}
                  />
                </em>
              </p>
            </div>
            <div className="pt-5">
              <p className={fontColor}>
                <Translateable text={copy[4][language]} />
                <br />
                <br />
                <Translateable text={copy[5][language]} />
                <br />
                <br />
                <Translateable text={copy[6][language]} />
                <br />
                <br />
              </p>
            </div>
            <div className="pt-5">
              <p className={fontColor}>
                <Translateable text={copy[7][language]} />
                <br />
                <br />
                <Translateable text={copy[8][language]} />
              </p>
            </div>
          </SwipeableViews>
        </div>
      </div>
    )
  }
}
