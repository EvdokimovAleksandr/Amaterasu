import React from 'react'

import Sharingan from 'Icons/Sharingan'
import ItachiPNG from '@/../../public/img/Itachi.png'

import './index.scss'
import Form from 'Components/Form/Form'

export default function Main() {
  return (
    <div className="main-container">
      <div className="sharingan">
        <Sharingan />
      </div>
      <div className="img-container">
        <img src={ItachiPNG} alt="" />
      </div>

      <div className='forms'>
        <Form />
        <Form />
      </div>
    </div>
  )
}
