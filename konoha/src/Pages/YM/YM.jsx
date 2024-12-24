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
import { clearDataSpotify, successAuthSpotify } from './../../Redux/Actions/SpotifyActions'
import { clearDataYm, responseListLikedYm } from './../../Redux/Actions/YMActions'
import { changeAuth } from 'Components/Forms'

import './index.scss'
import CustomButton from 'Components/UI/CustomButton/CustomButton'

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

  const handleClearStore = () => {
    localStorage.removeItem('tracks')
    localStorage.removeItem('spotifyData')
    dispatch(clearDataSpotify())
    dispatch(clearDataYm())
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const code = queryParams.get('code')
    const tracksFromStroage = JSON.parse(localStorage.getItem('tracks'))

    if (code) {
      handleAuthCallback(code)
    }

    if (tracksFromStroage) {
      dispatch(responseListLikedYm(tracksFromStroage))
    }
  }, [])

  if (spotifyData) {
    dispatch(successAuthSpotify(spotifyData))
  }

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
            <CustomButton label="Очистить данные" onClickFn={handleClearStore} />
          </div>
          <ListTracks list={tracks} />
        </div>
      </div>
    </div>
  )
}
