import React from 'react'
import Section from '../Section'
import LanguageSelector from '../LanguageSelector/LanguageSelector';

export default class Page extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            language: 'english'
        }
    }

    switchLanguage = () => {

        const language = this.state.language === 'english' ? 'spanish' : 'english'
        this.setState({ language })
    }

    render = () => {

        const opacity = this.props.animationOver ? 'opacity-100 blur-0' : 'opacity-0 blur-10'
        

        return (
            <div className={`w-screen ${opacity}`} >
                <LanguageSelector switchLanguage={this.switchLanguage}/>
                {this.props.sections.map((s, i) => {

                    const { language } = this.state

                    const bg = !(i % 2) ? 'bg-white' : 'bg-red-base'

                    const content = s.content ? React.cloneElement(s.content, { language }) : s.title
                    
                    return <Section key={`section-${i}`} innerRef={s.ref} styleClasses={bg}>{content}</Section>   
                })}
            </div>
        )
    }
}

