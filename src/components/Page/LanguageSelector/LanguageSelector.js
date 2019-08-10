import React from 'react'
import Translateable from '../../Translateable/Translateable'
import Toggle from 'react-toggle'

import './LanguageSelector.css'

const LanguageSelector = props => {
  return (
    <div className="fixed top-0 right-0 z-999999 flex justify-center items-center pt-5 pr-5 sm:pt-12 sm:pr-24">
      <div className="bg-black rounded-full py-1 px-2 flex justify-center items-center">
        <span className="font-primary text-white mr-2 sm:text-xl">
          <Translateable text={props.language} />
        </span>
        <Toggle icons={false} onChange={props.toggle} />
      </div>
    </div>
  )
}

export default LanguageSelector
