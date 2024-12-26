import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Notification from 'Components/UI/Notification/Notification'
import Sharingan from 'Icons/Sharingan'

import './index.scss'

export default function PreloadPage() {
  const [openNotification, setOpenNotification] = useState(false)
  const { notification, endTransfer } = useSelector((state) => state.SpotifyReducer)

  useEffect(() => {
    setOpenNotification(endTransfer)
  }, [endTransfer])

  return (
    <div className="preload-page">
      <div className="wrapper-content">
        <div className="content-container">
          <div className="preloader">
            <div className="preloader-container">
              {endTransfer ? (
                <>
                  <div className="sharingan">
                    <Sharingan width={'150px'} height={'250px'} />
                  </div>
                  <span className="preload-text">Перенос закончился!!!</span>
                  <div className="sharingan">
                    <Sharingan width={'150px'} height={'250px'} />
                  </div>
                </>
              ) : (
                <>
                  <div className="sharingan">
                    <Sharingan width={'150px'} height={'250px'} />
                  </div>
                  <span className="preload-text">
                    Перенос треков выполняется,
                    <br />а пока можете посмотреть
                    <br />
                    Наруто "Ураганные хроники"
                  </span>
                  <div className="sharingan">
                    <Sharingan width={'150px'} height={'250px'} />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="naruto-container">
            <iframe
              src="//aniqit.com/serial/39719/41d91a6dc39957f0b481a2466179dcc1/720p"
              width="900"
              height="580"
              frameborder="0"
              AllowFullScreen
              allow="autoplay *; fullscreen *"
            ></iframe>
          </div>
          <div className="notification">
            <Notification
              message={notification.message}
              list={notification.listNotFound}
              status={notification.status}
              open={openNotification}
              handleClose={() => setOpenNotification(false)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
