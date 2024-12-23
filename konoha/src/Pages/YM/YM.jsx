import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ListTracks from 'Components/ListTracks/ListTracks'
import Sharingan from 'Icons/Sharingan'
import ItachiPNG from '@/../../public/img/Itachi.png'
import YandexMusicLogo from 'Icons/YandexMusicLogo'
import SpotifyLogo from 'Icons/SpotifyLogo'
import Arrow from 'Icons/Arrow'
import ModalForAuth from 'Components/ModalForAuth/ModalForAuth'

import { handleAuthCallback } from 'Api/ApiSpotify/AUTH-spotify'
import { successAuthSpotify } from './../../Redux/Actions/SpotifyActions'
import { changeAuth } from 'Components/Forms'

import './index.scss'

export default function YM() {
  const dispatch = useDispatch()
  const spotifyData = JSON.parse(localStorage.getItem('spotifyData'))
  const [activeAuth, setActiveAuth] = useState('')
  const [openAuth, setOpenAuth] = useState(false)
  const tracks = useSelector((state) => state.YMReducer.list)

  const handleOpenAuth = (service) => {
    setActiveAuth(service)
    setOpenAuth(true)
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const code = queryParams.get('code')

    if (code) {
      handleAuthCallback(code)
    }

    if (spotifyData) {
      dispatch(successAuthSpotify(spotifyData))
    }
  }, [])

  return (
    <div className="main-container">
      <ModalForAuth open={openAuth} closeFn={() => setOpenAuth(false)}>
        {changeAuth(activeAuth)}
      </ModalForAuth>
      <div className="sharingan">
        <Sharingan />
      </div>
      <div className="img-container">
        <img src={ItachiPNG} alt="" />
      </div>
      <div className="wrapper-form">
        <div className="forms">
          <div className="services-container">
            <div className="first-service" onClick={() => handleOpenAuth('yandex')}>
              <YandexMusicLogo />
            </div>
            <div className="arrow">
              <Arrow />
            </div>
            <div className="second-service" onClick={() => handleOpenAuth('spotify')}>
              <SpotifyLogo />
            </div>
          </div>
          <ListTracks list={tracks} />
        </div>
      </div>
    </div>
  )
}
