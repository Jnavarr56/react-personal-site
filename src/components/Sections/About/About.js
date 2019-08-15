import React from 'react'
import Translateable from '../../Translateable'
import SwipeableViews from 'react-swipeable-views'

export default class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }

    this.copy = {
      0: {
        english: 'Swipe left to learn more!',
        español: '¡Deslizar hacia la izquierda para ver más!'
      },
      1: {
        english:
          "I'm a 23 year old, bilingual, MS in Comp Sci candidate and Bootcamp grad with a React.js/Node.js internship under my belt.",
        español:
          'Soy un candidato para maestría en ciencias de la computación y que acabo de terminar una pasantía "full stack" (React.js/Node.js).'
      },
      2: {
        english:
          "I'm based in NYC and looking for full-stack opportunities, but am totally open to QA/front-end engineering positions.",
        español:
          'Vivo en Nueva York y estoy buscando opportunidades full stack pero tambien estoy abierto a positiones de control de calidad o en ingenieria "front-end".'
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
        español:
          '¿Crees que podría ser tu próxima gran contratación? Contáctenme!'
      },
      8: {
        english:
          'This site was built with Create-React-App and a number of libraries you can find at this repo.',
        español: 'Esta pagina se hico con Create-React-App.'
      }
    }
  }

  handleChangeIndex = (index, old, meta) => {
    this.setState({ index })
  }

  handleSwitching = (percent, type, slides) => {
    if (type === 'end') {
      if (percent === slides.length - 1) this.setState({ index: 0 })
      else if (percent === 0) {
        this.setState({ index: slides.length - 1 })
      }
    }
  }

  renderMobileView = (copy, fontColor, language) => {
    const slides = [
      <div key={'slide-1'} className="flex justify-start pt-5 pl-1 break-word">
        <p className={fontColor}>
          <Translateable text={copy[1][language]} />
          <br />
          <br />
          <Translateable text={copy[3][language]} />
          <br />
          <br />
          <Translateable text={copy[2][language]} />
          <br />
          <br />
          <em className="font-bold">
            <Translateable text={copy[0][language]} />
          </em>
        </p>
      </div>,
      <div key={'slide-2'} className="pt-5 pl-1 break-word">
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
      </div>,
      <div key={'slide-3'} className="pt-5 pl-1 break-word">
        <p className={fontColor}>
          <Translateable text={copy[7][language]} />
          <br />
          <br />
          <Translateable text={copy[8][language]} />
          <br />
        </p>
      </div>
    ]

    return (
      <React.Fragment>
        <SwipeableViews
          index={this.state.index}
          enableMouseEvents={true}
          onSwitching={(p, type) => this.handleSwitching(p, type, slides)}
          onChangeIndex={this.handleChangeIndex}
        >
          {slides}
        </SwipeableViews>
        <div className="absolute bottom-0 left-0 w-full flex justify-center items-center pb-8">
          {slides.map((s, index) => {
            const bg = index === this.state.index ? 'bg-white' : 'bg-base-red'
            return (
              <div
                key={`ball-about-${index}`}
                className={`${bg} rounded-full transition-all-50 border border-white h-5 w-5 mx-2`}
                onClick={() => this.setState({ index })}
              ></div>
            )
          })}
        </div>
      </React.Fragment>
    )
  }

  renderLargeView = (copy, fontColor, language) => {
    return (
      <React.Fragment>
        <p className={`${fontColor} text-lg md:text-xl`}>
          <Translateable text={copy[1][language]} />
          <br />
          <br />
          <Translateable text={copy[3][language]} />
          <br />
          <br />
          <Translateable text={copy[2][language]} />
          <br />
          <br />
          <Translateable text={copy[4][language]} />
          <br />
          <br />
          <Translateable text={copy[5][language]} />
          <br />
          <br />
          <Translateable text={copy[6][language]} />
          <br />
          <br />
          <Translateable text={copy[7][language]} />
          <br />
          <br />
          <Translateable text={copy[8][language]} />
        </p>
      </React.Fragment>
    )
  }

  render = () => {
    return (
      <React.Fragment>
        <div className="w-full flex flex-col items-center justify-center sm:hidden px-3">
          {this.renderMobileView(
            this.copy,
            this.props.fontColor,
            this.props.language
          )}
        </div>
        <div className="w-full hidden sm:flex flex-col items-center justify-center sm:px-16 md:items-start">
          {this.renderLargeView(
            this.copy,
            this.props.fontColor,
            this.props.language
          )}
        </div>
      </React.Fragment>
    )
  }
}
