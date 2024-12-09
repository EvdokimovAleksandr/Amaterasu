import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Form from 'Components/Form/Form'
import Input from 'Components/Input/Input'
import Sharingan from 'Icons/Sharingan'
import ItachiPNG from '@/../../public/img/Itachi.png'

import { getListActionYm } from './../../Redux/Actions/YMActions'

import './index.scss'

export default function YM() {
  const dispatch = useDispatch()
  const [token, setToken] = useState('')

  const handleRequestList = () => {
    if (token) {
      console.log('bef')

      dispatch(getListActionYm({ token: token }))
      console.log('af')
    }
  }

  return (
    <div className="main-container">
      <div className="sharingan">
        <Sharingan />
      </div>
      <div className="img-container">
        <img src={ItachiPNG} alt="" />
      </div>
      <div className="wrapper-form">
        <Input
          cssName={'input-token'}
          value={token}
          setValue={setToken}
          placeholder={'Введите свой токен я.музыки'}
          confirmFn={handleRequestList}
        />
        <div className="forms">
          <Form />
        </div>
      </div>
    </div>
  )
}
