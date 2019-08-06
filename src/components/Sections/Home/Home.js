import React from 'react'

export default class Home extends React.Component {
    constructor(props) {
        super(props)

        this.text = {
            subtitle: {
                english: 'Full Stack Developer',
                spanish: 'Desarrollador Full Stack'
            }
        }
    } 

    render = () => {

        const subtitle = this.text.subtitle[this.props.language]

        return (
            <div className="h-full w-full flex justify-center items-center">
                <div>
                    <h1 className="text-black text-center text-2xl sm:text-6xl font-primary">Jorge Andrés Navarro</h1>
                    <p className="text-black text-center text-xl sm:text-4xl font-primary tracking-widest uppercase">{subtitle}</p>
                </div>
            </div>
        )
    }
}