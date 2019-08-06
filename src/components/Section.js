import React from 'react'

const Section = props => {

    return (
        <section className={`h-screen w-screen ${props.styleClasses}`} ref={props.innerRef}>
            {props.children}
        </section>
    )
}

export default Section