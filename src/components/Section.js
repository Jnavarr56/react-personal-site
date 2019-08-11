import React from 'react'
import Title from './Title/Title'

const Section = props => {
  const { innerRef, children, language, title, backgroundColor } = props
  const fontColor = 'bg-red-base' ? 'text-white' : 'text-red-base'

  return (
    <section
      className={`h-screen w-screen relative ${backgroundColor}`}
      ref={innerRef}
    >
      {title && <Title fontColor={fontColor} text={title[language]} />}
      {React.cloneElement(children, { fontColor, language })}
    </section>
  )
}

export default Section
