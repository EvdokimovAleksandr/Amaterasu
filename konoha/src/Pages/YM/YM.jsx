import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ListTracks from 'Components/ListTracks/ListTracks'
import Field from 'Components/Field/Field'
import Sharingan from 'Icons/Sharingan'
import ItachiPNG from '@/../../public/img/Itachi.png'

import { getListActionYm } from './../../Redux/Actions/YMActions'

import './index.scss'
import YandexMusicLogo from 'Icons/YandexMusicLogo'
import SpotifyLogo from 'Icons/SpotifyLogo'
import Arrow from 'Icons/Arrow'

export default function YM() {
  const dispatch = useDispatch()
  const [token, setToken] = useState('')
  const tracks = useSelector((state) => state.YMReducer.list)

  const handleRequestList = () => {
    if (token) {
      dispatch(getListActionYm({ token: token }))
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
        <Field
          cssName={'input-token'}
          value={token}
          setValue={setToken}
          placeholder={'Введите свой токен я.музыки'}
          confirmFn={handleRequestList}
        />
        <div className="forms">
          <div className="services-container">
            <div className="first-service">
              <YandexMusicLogo />
            </div>
            <div className="arrow">
              <Arrow />
            </div>
            <div className="second-service">
              <SpotifyLogo />
            </div>
          </div>
          <ListTracks list={tracks} />
        </div>
      </div>
    </div>
  )
}
