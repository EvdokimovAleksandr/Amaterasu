import React from 'react'

import Sharingan from 'Icons/Sharingan'

import './index.scss'

export default function PreloadPage() {
  return (
    <div className="preload-page">
      <div className="wrapper-content">
        <div className="content-container">
          <div className="preloader">
            <div className="preloader-container">
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
          <div className="notification"></div>
        </div>
      </div>
    </div>
  )
}
