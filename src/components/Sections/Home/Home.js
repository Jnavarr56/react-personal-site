import React from 'react'
import OctoKit from '@octokit/rest'
import Translateable from '../../Translateable'
import particles from './ParticleConfig'
import IconLinks from './IconLinks/IconLinks'
import Button from '../../Button/FlashButton'
import Modal from '../../Modal'
import ReactLoading from 'react-loading'
import { MdClose, MdWarning } from 'react-icons/md'
import { GoOctoface, GoBrowser } from 'react-icons/go'
import ContentSwitcher from './ContentSwitcher/ContentSwitcher'
import SwipeableGithubModal from './SwipeableGithubModal/SwipeableGithubModal'
import resume from './Jorge Navarro - Resume.pdf'

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.initialState = {
      open: false,
      loading: false,
      data: null,
      error: null,
      dataSelector: 0
    }

    this.state = {
      ...this.initialState
    }

    this.download = React.createRef()

    this.text = {
      subtitle: {
        english: 'Full Stack Developer',
        español: (
          <span>
            Desarrollador
            <br className="sm:hidden" />
            <span> </span>Full Stack
          </span>
        )
      },
      button: {
        english: 'See Last Git Event',
        español: 'Ver Ultimo Evento de Git'
      },
      resume: {
        english: 'Download Resume',
        español: 'Descarga Oja de Vida'
      },
      modalContent: {
        errorMessage: {
          english:
            'There was an error grabbing my Github data. Try again later!',
          español:
            'Hay un problema conesguiendo mi informacion de Github. Intentalo mas tarde!'
        },
        event: {
          PushEvent: {
            english: 'Pushed',
            español: 'Empujo'
          },
          CreateEvent: {
            english: 'Created',
            español: 'Creó'
          },
          DeleteEvent: {
            english: 'Deleted',
            español: 'Elimino'
          }
        },
        item: {
          branch: {
            english: 'branch',
            español: 'branch'
          },
          repository: {
            english: 'repository',
            español: 'repositorio'
          }
        },
        refMaster: {
          english: 'the master',
          español: 'el "master"'
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
    this.setState({ open: true, loading: true }, this.fetchGithubData)
  }

  handleCloseModalClick = () => {
    this.setState({ ...this.initialState })
  }

  fetchGithubData = async () => {
    // this.setState({
    //   data: [testData()],
    //   loading: false
    // })

    const client = new OctoKit({
      auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN
    })

    const repoQueryParams = {
      visibility: 'public',
      sort: 'updated',
      direction: 'desc'
    }

    await client.repos.list(repoQueryParams).then(
      async ({ data }) => {
        const repoEventsQueryParams = {
          repo: data[0].name,
          owner: process.env.REACT_APP_GITHUB_USERNAME
        }

        await client.activity.listRepoEvents(repoEventsQueryParams).then(
          ({ data }) => {
            console.log(data)

            this.delaySetData(true, data)
          },
          error => {
            console.log(error)

            this.delaySetData(false, error)
          }
        )
      },
      error => {
        console.log(error)

        this.delaySetData(false, error)
      }
    )
  }

  delaySetData = (isData, data) => {
    const update = { loading: false }
    if (isData) update.data = data
    else update.error = data

    clearTimeout(this.modalContentDelay)

    this.modalContentDelay = setTimeout(() => {
      this.setState(update)
    }, 1250)
  }

  renderModalContent = () => {
    if (this.state.loading) {
      return (
        <div className="h-full w-full flex justify-center items-center py-5">
          <ReactLoading
            type={'spin'}
            color={'white'}
            height={'7rem'}
            width={'7rem'}
          />
        </div>
      )
    } else {
      if (this.state.error) {
        return (
          <p className="font-primary text-white">
            <Translateable
              text={this.text.modalContent.errorMessage[this.props.language]}
            />
          </p>
        )
      } else if (this.state.data) {
        const { data, dataSelector } = this.state
        const { event, item, refMaster } = this.text.modalContent
        const { language } = this.props

        const { type, payload, repo } = data[dataSelector]

        const action = event[type][language]

        let iconTarget

        const New = {
          english: 'new',
          español: 'nuevo'
        }

        const Called = {
          english: 'called',
          español: 'llamada'
        }

        const In = {
          english: 'in',
          español: 'en'
        }

        const To = {
          english: 'to',
          español: 'a'
        }

        let text = ''
        let link = `https://github.com/${repo.name}`

        if (type === 'CreateEvent') {
          const target = item[payload.ref_type][language]

          if (payload.ref === 'master') {
            iconTarget = 'branch'
            link += '/tree/master'
            text = (
              <span>
                {`${action} `}{' '}
                <a
                  className="underline"
                  href={link}
                >{`${refMaster[language]} ${target}`}</a>
                {` ${In[language]} ${item.repository[language]} ${Called[language]}`}{' '}
                <a
                  className="underline"
                  href={`https://github.com/${repo.name}`}
                >{` ${repo.name.split('/')[1]}`}</a>
                .
              </span>
            )
          } else {
            if (payload.ref_type === 'branch') {
              iconTarget = 'branch'
              link += `/tree/${payload.ref}`
              text = (
                <span>
                  {`${action} ${New[language]} ${target} ${Called[language]}`}{' '}
                  <a className="underline" href={link}>{`${payload.ref}`}</a>
                  {` ${In[language]} ${item.repository[language]} ${Called[language]} `}
                  <a
                    className="underline"
                    href={`https://github.com/${repo.name}`}
                  >{` ${repo.name.split('/')[1]}`}</a>
                  .
                </span>
              )
            } else {
              iconTarget = 'repo'
              link += `/tree/${payload.ref}`
              text = (
                <span>
                  {`${action} ${New[language]} ${target} ${Called[language]}`}{' '}
                  <a className="underline" href={link}>{`${
                    repo.name.split('/')[1]
                  }`}</a>
                  .
                </span>
              )
            }
          }
        } else if (type === 'PushEvent') {
          iconTarget = 'branch'

          const { commits } = payload

          if (payload.ref === 'refs/heads/master') {
            text = (
              <span>
                {`${action} ${commits.length} commit${
                  commits.length > 1 ? 's' : ''
                } ${To[language]}`}{' '}
                <a
                  className="underline"
                  href={link + '/tree/master'}
                >{`${refMaster[language]} branch`}</a>
                {` ${In[language]} ${item.repository[language]} ${Called[language]}`}{' '}
                <a
                  className="underline"
                  href={`https://github.com/${repo.name}`}
                >{` ${repo.name.split('/')[1]}`}</a>
                .
              </span>
            )
          } else {
            let branchName = payload.ref.split('/')
            branchName = branchName[branchName.length - 1]
            text = (
              <span>
                {`${action} ${commits.length} commit${
                  commits.length > 1 ? 's' : ''
                } ${To[language]} branch ${Called[language]} `}{' '}
                <a className="underline" href={link + `/tree/${branchName}`}>
                  {' '}
                  {`${branchName}`}
                </a>
                {` ${In[language]} ${item.repository[language]} ${Called[language]}`}{' '}
                <a
                  className="underline"
                  href={`https://github.com/${repo.name}`}
                >{` ${repo.name.split('/')[1]}`}</a>
                .
              </span>
            )
          }
        } else if (type === 'DeleteEvent') {
          const target = item[payload.ref_type][language]

          if (payload.ref === 'master') {
            iconTarget = 'branch'
            link += '/tree/master'
            text = (
              <span>
                {`${action} `}{' '}
                <a
                  className="underline"
                  href={link}
                >{`${refMaster[language]} ${target}`}</a>
                {` ${In[language]} ${item.repository[language]} ${Called[language]}`}{' '}
                <a
                  className="underline"
                  href={`https://github.com/${repo.name}`}
                >{` ${repo.name.split('/')[1]}`}</a>
                .
              </span>
            )
          } else {
            if (payload.ref_type === 'branch') {
              iconTarget = 'branch'
              link += `/tree/${payload.ref}`
              text = (
                <span>
                  {`${action} ${target} ${Called[language]} ${payload.ref} ${In[language]} ${item.repository[language]} ${Called[language]} `}
                  <a
                    className="underline"
                    href={`https://github.com/${repo.name}`}
                  >{` ${repo.name.split('/')[1]}`}</a>
                  .
                </span>
              )
            } else {
              iconTarget = 'repo'
              link += `/tree/${payload.ref}`
              text = <span>{`${action} ${target} ${Called[language]}.`}</span>
            }
          }
        }

        const commitProps = payload.commits ? payload.commits : []
        return (
          <SwipeableGithubModal
            summary={text}
            repo={repo}
            event={type}
            target={iconTarget}
            commits={commitProps}
            language={this.props.language}
          />

          // <ContentSwitcher
          //   summary={text}
          //   createdAt={data[dataSelector].created_at}
          //   commits={payload.commits}
          //   repo={repo}
          //   target={iconTarget}
          //   event={type}
          //   language={this.props.language}
          // />
        )
      }
    }
  }

  renderModalContainer = () => {
    return (
      <div className="w-screen md:w-200 flex flex-col justify-start items-center">
        <div className="rounded overflow-hidden bg-black h-full w-full flex flex-col justify-start items-center">
          <div className="w-full border-b border-white flex justify-between p-3">
            {this.state.error ? (
              <MdWarning className="text-white text-3xl" />
            ) : (
              <GoOctoface className="text-white text-3xl" />
            )}
            <MdClose
              className="text-red-base text-2xl cursor-pointer"
              onClick={this.handleCloseModalClick}
            />
          </div>
          <div className="w-full flex-grow flex flex-col justify-center items-center">
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
        <div className="z-9999 bg-white-opacity-75 flex flex-col items-center px-3">
          <h1 className="text-black text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-primary">
            Jorge Andrés Navarro
          </h1>
          <p className="text-black text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-widest uppercase font-thin">
            <Translateable text={subtitle} />
          </p>
          <div className="flex flex-col md:flex-row justify-around items-center w-full mt-1 sm:mt-4">
            <Button
              onClick={this.handleOpenModalClick}
              className="p-2 sm:p-4 rounded text-white text-xs sm:text-sm font-primary shadow-2xl tracking-widest uppercase w-full md:w-6/12 font-thin bg-black hover:bg-red-base transition-all-25 tran md:mr-2 my-1 md:my-0"
            >
              <Translateable text={this.text.button[this.props.language]} />
            </Button>
            <Button
              onClick={() => this.download.current.click()}
              className="p-2 sm:p-4 rounded text-white text-xs sm:text-sm font-primary shadow-2xl tracking-widest uppercase w-full md:w-6/12 font-thin bg-black hover:bg-red-base transition-all-25 md:ml-2 my-1 md:my-0"
            >
              <Translateable text={this.text.resume[this.props.language]} />
            </Button>
            <a
              ref={this.download}
              href={resume}
              target="_blank"
              className="hidden"
              download
            ></a>
          </div>
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
