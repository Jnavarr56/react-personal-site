import React from 'react'
import LandingAnimation from './components/LandingAnimation/LandingAnimation'
import Page from './components/Page/Page'
import Home from './components/Sections/Home/Home'

export default class Site extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            animationOver: false,
            showAnimation: true
        }

        this.sections = [
            { title: "Home", content: <Home /> },
            { title: "About", content: null },
            { title: "Skills", content: null },
            { title: "Portfolio", content: null },
            { title: "Articles", content: null },
            { title: "Contact", content: null }
        ].map(s => {
            s.ref = React.createRef()
            return s
        })
    }   

    handleAnimationOver = () => {

        this.setState({ animationOver: true }, () => {
            setTimeout(() => this.setState({ showAnimation: false }), 600)
        })
    }

    render = () => {
        
        const scrollable = this.state.showAnimation ? 'overflow-hidden' : 'overflow-scroll'

        return (
            <div className={`h-screen w-screen ${scrollable} relative`}>
                {this.state.showAnimation && <LandingAnimation animationOver={this.state.animationOver} onAnimationOver={this.handleAnimationOver}/>}
                {<Page animationOver={this.state.animationOver} sections={this.sections}/>}
            </div>

        )
    }
}