import React from 'react'
import OctoKit from '@octokit/rest'
import Translateable from '../../Translateable/Translateable'
import particles from './ParticleConfig'
import IconLinks from './IconLinks/IconLinks'
import Button from '../../Button/FlashButton'
import Modal from '../../Modal/Modal'
import ReactLoading from 'react-loading'
import { MdClose, MdWarning } from 'react-icons/md'
import { GoOctoface } from 'react-icons/go'

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.initialState = {
      open: false,
      loading: false,
      data: null,
      err: null
    }

    this.state = {
      ...this.initialState
    }

    this.text = {
      subtitle: {
        english: 'Full Stack Developer',
        español: 'Desarrollador Full Stack'
      },
      button: {
        english: 'View Latest Git Commit',
        español: "Ver Ultimo 'Git Commit'"
      },
      modalContent: {
        errorHeader: {
          english: 'Oh No!',
          español: 'Ay Caramba!'
        },
        errorMessage: {
          english:
            'There was an error grabbing my Github data. Try again later!',
          español: 'Hay un problema conesguiendo mi informacion de Github.'
        }
      }
    }

    this.particleContainer = React.createRef()

    this.modalContentDelay = null
  }

  componentDidMount = () => {
    window.particlesJS('home-particles', particles)
  }

  handleOpenModalClick = () => {
    this.setState({ open: true, loading: true }, async () => {
      const client = new OctoKit({
        auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN
      })

      await client.activity
        .listEventsForUser({
          username: process.env.REACT_APP_GITHUB_USERNAME
        })
        .then(
          ({ data, headers, status }) => {
            clearTimeout(this.modalContentDelay)
            this.modalContentDelay = setTimeout(() => {
              this.setState({ loading: false, data })
            }, 500)
          },
          err => {
            this.setState({ loading: false, err })
          }
        )
    })
  }

  handleCloseModalClick = () => {
    this.setState({ ...this.initialState })
  }

  renderModalContent = () => {
    if (this.state.loading) {
      return (
        <ReactLoading
          type={'cylon'}
          color={'red'}
          height={'7rem'}
          width={'7rem'}
        />
      )
    } else {
      if (this.state.error) {
        return (
          <p className="font-primary text-red-base">
            <Translateable
              text={this.text.modalContent.errorMessage[this.props.language]}
            />
          </p>
        )
      } else {
        return <p className="font-primary text-red-base">SUCCESS!</p>
      }
    }
  }

  renderModalContainer = () => {
    return (
      <div className="h-64 w-screen px-2 md:h-100 md:w-200 md:px-0 flex flex-col justify-start items-center">
        <div className="rounded overflow-hidden bg-black h-full w-full flex flex-col justify-start items-center">
          <div className="w-full border-b border-red-base flex justify-between p-3">
            {this.state.error ? (
              <MdWarning className="text-red-base text-2xl" />
            ) : (
              <GoOctoface className="text-red-base text-2xl" />
            )}

            <MdClose
              className="text-red-base text-2xl cursor-pointer"
              onClick={this.handleCloseModalClick}
            />
          </div>
          <div className="w-full p-10 flex flex-col justify-center items-center">
            {this.renderModalContent()}
          </div>
        </div>
      </div>
    )
  }

  render = () => {
    const subtitle = this.text.subtitle[this.props.language]

    return (
      <div className="h-full w-full flex justify-center items-center">
        <div
          id="home-particles"
          className="h-full w-full absolute top-0 right-0"
        ></div>
        <IconLinks />
        <div className="z-50 bg-white-opacity-75 flex flex-col items-center px-3">
          <h1 className="text-black text-center text-2xl sm:text-6xl font-primary">
            Jorge Andrés Navarro
          </h1>
          <p className="text-black text-center text-xl sm:text-4xl tracking-widest uppercase">
            <Translateable text={subtitle} />
          </p>
          <Button
            onClick={this.handleOpenModalClick}
            className="bg-red-base mt-0 sm:mt-10 p-2 sm:p-4 rounded text-white text-xs sm:text-sm font-primary shadow-2xl tracking-widest uppercase w-full"
          >
            <Translateable text={this.text.button[this.props.language]} />
          </Button>
        </div>
        <Modal
          open={this.state.open}
          onClose={this.handleCloseModalClick}
          overlayClickable={true}
        >
          {this.renderModalContainer()}
        </Modal>
      </div>
    )
  }
}
