import React from 'react'

export default class Translateable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            fadingOut: false,
            fadingIn: true,
            text: ''
        }

        this.fadeClasses = {
            fadingOut: 'opacity-0 blur-10',
            fadingIn:  'opacity-100 blur-0',
        }
    }

    
    componentDidMount = () => {
        
        this.setState({ text: this.props.text })
    }

    componentDidUpdate = prevProps => {

        if (prevProps.text !== this.props.text) {
            
            this.setState({ fadingOut: true, fadingIn: false }, () => {

                setTimeout(() => {

                    this.setState({ text: this.props.text }, () => {

                        setTimeout(() => {
    
                            this.setState({
                                fadingOut: false,
                                fadingIn: true
                            })
    
                        }, 250)
    
                    })

                }, 250)

            })

        }

    }

    render = () => {

        const { text, fadingIn,  fadingOut } = this.state

        let style = ''

        if (fadingIn) {
            style = this.fadeClasses.fadingIn
        }
        else if (fadingOut) {
            style = this.fadeClasses.fadingOut
        }
        

        return <span className={`font-primary transition-all-50 ${style}`}>{text}</span>
    }
}