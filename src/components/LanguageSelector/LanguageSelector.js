import React from 'react'
import Toggle from 'react-toggle'

import './LanguageSelector.css'

export default class LanguageSelector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            language: 0
        }

        this.languages = ['english', 'spanish']
    }

    toggle = () => {
        this.setState(state => ({ language: state.language ? 0 : 1 }), () => {
            this.props.switchLanguage()
        })
    }

    render = () => {

        const { language } = this.state

        

        return (
            <div><span>{this.languages[language]}</span> <Toggle icons={false} onChange={this.toggle} /></div>

        )
    }
}

