import React from 'react'
import Translateable from '../../../Translateable'
import {
  GoGitCommit,
  GoTerminal,
  GoRepoPush,
  GoRepo,
  GoGitBranch,
  GoTrashcan
} from 'react-icons/go'
import moment from 'moment'
import 'moment/locale/es'

export default class ContentSwitcher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      section: 0
    }

    this.text = {
      message: {
        english: 'Message',
        español: 'Mensaje'
      },
      link: {
        english: 'Go to Commit Page',
        español: 'Ir a Página de Commit'
      }
    }
  }

  renderSummary = () => {
    const left = `-${this.state.section * 100}%`
    const { target, event } = this.props

    let summaryIcon = null

    if (event === 'DeleteEvent') {
      summaryIcon = <GoTrashcan className="text-red-base text-5xl" />
    } else if (target === 'branch') {
      if (event === 'CreateEvent')
        summaryIcon = <GoGitBranch className="text-red-base text-5xl" />
      else if (event === 'PushEvent')
        summaryIcon = <GoTerminal className="text-red-base text-5xl" />
    } else if (target === 'repo') {
      if (event === 'CreateEvent')
        summaryIcon = <GoRepo className="text-red-base text-5xl" />
      else if (event === 'PushEvent')
        summaryIcon = <GoRepoPush className="text-red-base text-5xl" />
    } else {
      summaryIcon = <GoTerminal className="text-red-base text-5xl" />
    }

    const stamp = moment(this.props.createdAt)
    stamp.locale(this.props.language.slice(0, 2))

    return (
      <div
        key="summary"
        className={`h-full w-full flex-shrink-0 flex flex-col justify-start items-center transition-all-25 relative scrollbar-y-visible px-3`}
        style={{ left }}
      >
        <div className="mb-3 hidden sm:block">{summaryIcon}</div>
        <p className="text-red-base text-center">
          <Translateable text={this.props.summary} />
        </p>
        <p className="text-red-base text-center">
          <Translateable text={stamp.format('LLLL')} />
        </p>
      </div>
    )
  }

  renderCommits = (commit, idx) => {
    const message = `${this.text.message[this.props.language]}: ${
      commit.message
    }`
    const link = `${this.text.link[this.props.language]}`

    return (
      <div
        key={`c-${idx}`}
        className={`h-full w-full flex-shrink-0 flex flex-col justify-start items-center transition-all-25 relative scrollbar-y-visible px-3`}
        style={{ left: `-${this.state.section * 100}%` }}
      >
        <GoGitCommit className="text-red-base text-5xl" />
        <p className="text-red-base text-center">
          <Translateable text={message} />
        </p>
        <a
          href={`https://github.com/${this.props.repo.name}/commit/${commit.sha}`}
          className="text-red-base underline text-center"
        >
          <Translateable text={link} />
        </a>
      </div>
    )
  }

  render = () => {
    const sections = this.props.commits
      ? [this.renderSummary(), ...this.props.commits]
      : [this.renderSummary()]

    return (
      <div className="h-full w-full flex justify-start items-start relative pt-4">
        {sections.map((c, i) => {
          if (!i) return c
          else return this.renderCommits(c, i)
        })}

        <div className="w-full absolute flex justify-center items-start h-8 pb-2 bottom-0 left-0">
          {this.props.commits &&
            sections.map((c, i) => {
              const bg = this.state.section === i ? 'bg-red-base' : 'bg-white'

              return (
                <div
                  key={`ball-${i}`}
                  onClick={() => this.setState({ section: i })}
                  className={`${bg} h-3 w-3 mx-1 rounded-full cursor-pointer transition-all-50`}
                ></div>
              )
            })}
        </div>
      </div>
    )
  }
}
