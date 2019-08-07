import React from 'react'
import particles from './ParticleConfig'

export default class LandingAnimation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            percent: 0,
            animationOver: false,
            leaving: false
        }

        this.incrementer = null
    }

    componentDidMount = () => {

        window.particlesJS('landing-particles', particles)

        this.incrementer = setInterval(() => {

            this.setState(state => ({  percent: state.percent + 1 }))

        }, 25)
    }

    componentDidUpdate = () => {

        if (!this.state.animationOver) this.performAnimation()

        else setTimeout(() => this.props.onAnimationOver(), 250)
    }

    componentWillUnmount = () => {
        window.pJSDom = [window.pJSDom[1]]
    }

    performAnimation = () => {

        const { percent } = this.state 

        if (percent < 100) {

            if (percent < 50) this.setSpeed(percent * 2)

            else this.setSpeed(this.getSpeed() - (this.getSpeed() / (100 - percent)))
        }

        else  {
            clearInterval(this.incrementer)

            setTimeout(() => this.setState({ animationOver: true }), 250)
        }
    }
    

    getSpeed = () => window.pJSDom[0].pJS.particles.move.speed

    setSpeed = speed => window.pJSDom[0].pJS.particles.move.speed = speed

    render = () => {

        const opacity = this.props.animationOver ? 'opacity-0 blur-10' : ''

        return (
            <div className={`h-full w-full flex justify-center items-center absolute top-0 left-0 z-9999 transition-all-50 ${opacity}`}>
                <p className="font-primary font-thin text-7xl sm:text-9xl z-50 bg-white-opacity-75">
                    {this.state.percent}%
                </p>
                <div id="landing-particles" className="h-full w-full absolute top-0 right-0"></div>
            </div>
        ) 
    }
}