import React from 'react'

const Section = props => {
  return (
    <section
      className={`h-screen w-screen relative ${props.styleClasses}`}
      ref={props.innerRef}
    >
      {React.cloneElement(props.children, {
        fontColor:
          props.styleClasses === 'bg-red-base' ? 'text-white' : 'text-red-base'
      })}
    </section>
  )
}

export default Section
