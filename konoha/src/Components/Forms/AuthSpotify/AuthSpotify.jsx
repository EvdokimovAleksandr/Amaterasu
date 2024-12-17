import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { startSpotifyAuth } from 'Api/ApiSpotify/AUTH-spotify'

export default function AuthSpotify() {
  const dispatch = useDispatch()

  const handleAuth = () => {
    startSpotifyAuth()
  }

  return (
    <div className="auth-spotify">
      <a className="auth-link-spotify" onClick={handleAuth}>
        Авторизация
      </a>
      <div className="form-wrapper">
        <input className="input-auth" type="text" placeholder="Назови плейлист" />
      </div>
    </div>
  )
}
