import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import Translateable from '../../../Translateable'
import {
  GoGitCommit,
  GoTerminal,
  GoRepoPush,
  GoRepo,
  GoGitBranch,
  GoTrashcan
} from 'react-icons/go'
// <ContentSwitcher
//   summary={text}
//   createdAt={data[dataSelector].created_at}
//   commits={payload.commits}
//   repo={repo}
//   target={iconTarget}
//   event={type}
//   language={this.props.language}
// />

export default class SwipeableGithubModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      index: 0
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

  getSummaryIcon = (event, target) => {
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

    return summaryIcon
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

  render = () => {
    const { event, language, target, summary, commits, repo } = this.props

    const pagination = []
    const slides = [summary, ...commits.reverse()].map((slide, index, arr) => {
      let message = ''
      if (index) {
        message = (
          <span>
            {`${this.text.message[language]}: ${slide.message}`}
            <br />
            <a
              target="_blank"
              href={`https://github.com/${repo.name}/commit/${slide.sha}`}
              className="underline"
            >{`${this.text.link[language]}`}</a>
          </span>
        )
      }

      if (arr.length) {
        const bg = index === this.state.index ? 'bg-red-base' : ''
        pagination.push(
          <div
            key={`ball-about-${index}`}
            className={`${bg} rounded-full transition-all-50 border border-red-base h-5 w-5 mx-2 cursor-pointer`}
            onClick={() => this.setState({ index })}
          ></div>
        )
      }

      return (
        <div
          key={`slide-${index}`}
          className="h-full w-full flex flex-col justify-start items-center pt-5 pb-8"
        >
          {!index ? (
            this.getSummaryIcon(event, target)
          ) : (
            <GoGitCommit className="text-red-base text-5xl" />
          )}
          <p className="text-red-base text-center text-lg w-screen sm:w-9/12 truncate mt-3">
            {!index ? (
              <Translateable text={summary} />
            ) : (
              <Translateable text={message} />
            )}
          </p>
        </div>
      )
    })

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
        <div className="w-full flex justify-center items-center pb-8">
          {pagination}
        </div>
      </React.Fragment>
    )
  }
}
