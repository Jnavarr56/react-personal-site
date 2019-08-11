import React from 'react'

const Section = props => {
  const { innerRef, children, language, title, backgroundColor } = props
  const fontColor = 'bg-red-base' ? 'text-white' : 'text-red-base'

  return (
    <section
      className={`h-screen w-screen relative ${backgroundColor}`}
      ref={innerRef}
    >
      {/* Title Component Will Go Here title[language]*/}
      {React.cloneElement(children, { fontColor, language })}
    </section>
  )
}

export default Section
