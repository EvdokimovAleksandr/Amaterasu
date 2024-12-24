import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PreloadPage from 'Pages/PreloadPage/PreloadPage'
import ListTracks from 'Components/ListTracks/ListTracks'
import Sharingan from 'Icons/Sharingan'
import ItachiPNG from '@/../../public/img/Itachi.png'
import YandexMusicLogo from 'Icons/YandexMusicLogo'
import SpotifyLogo from 'Icons/SpotifyLogo'
import Arrow from 'Icons/Arrow'
import ModalForAuth from 'Components/ModalForAuth/ModalForAuth'
import CustomButton from 'Components/UI/CustomButton/CustomButton'

import { handleAuthCallback } from 'Api/ApiSpotify/AUTH-spotify'
import { clearDataSpotify, successAuthSpotify } from './../../Redux/Actions/SpotifyActions'
import { clearDataYm, responseListLikedYm } from './../../Redux/Actions/YMActions'
import { changeAuth } from 'Components/Forms'

import './index.scss'

export default function YM() {
  const dispatch = useDispatch()
  const [activeAuth, setActiveAuth] = useState('')
  const [openAuth, setOpenAuth] = useState(false)
  const tracks = useSelector((state) => state.YMReducer.list)
  const { postRequest } = useSelector((state) => state.SpotifyReducer)

  const handleOpenAuth = (service) => {
    dispatch(successAuthSpotify(JSON.parse(localStorage.getItem('spotifyData')) || null))

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

  return postRequest ? (
    <PreloadPage />
  ) : (
    <div className="main-container">
      <ModalForAuth open={openAuth} closeFn={() => setOpenAuth(false)}>
        {changeAuth(activeAuth)}
      </ModalForAuth>
      <div className="sharingan">
        <Sharingan width={'800px'} height={'800px'} />
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
