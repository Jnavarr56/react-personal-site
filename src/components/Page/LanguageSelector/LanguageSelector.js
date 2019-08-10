import React from 'react'
import Translateable from '../../Translateable/Translateable'
import Toggle from 'react-toggle'

import './LanguageSelector.css'

const LanguageSelector = props => {
  return (
    <div className="fixed top-0 right-0 z-999999 flex justify-center items-center pt-5 pr-5 sm:pt-16 sm:pr-24">
      <span className="font-primary mr-2 sm:text-xl">
        <Translateable text={props.language} />
      </span>
      <Toggle icons={false} onChange={props.toggle} />
    </div>
  )
}

export default LanguageSelector
