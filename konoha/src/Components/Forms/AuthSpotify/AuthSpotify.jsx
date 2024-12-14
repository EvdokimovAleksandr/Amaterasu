import React, { useState } from 'react'

import CustomButton from 'Components/UI/CustomButton/CustomButton'

export default function AuthSpotify() {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const CLIENT_ID = 'your_client_id'
  const REDIRECT_URI = 'http://localhost:3000/callback' // Укажите ваш редирект URI
  const SCOPES = ['playlist-modify-private', 'playlist-modify-public'].join(' ')

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPES)}`

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev)
  }

  //accounts.spotify.com/authorize?scope=playlist-modify-private+playlist-modify-public&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&client_id=your_client_id&flow_ctx=36ba4118-da2c-4b3a-9639-265ff777ddef%3A1734213369

  https: return (
    <div className="auth-spotify">
      <div className="form-wrapper">
        <input className="input-auth" type="text" placeholder="Логин" />
        <div className="password-wrapper">
          <input className="input-auth" type={passwordVisible ? 'text' : 'password'} placeholder="Пароль" />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={togglePasswordVisibility}
            aria-label={passwordVisible ? 'Скрыть пароль' : 'Показать пароль'}
          >
            {passwordVisible ? '👁️' : '🙈'}
          </button>
        </div>
      </div>
      {/* <CustomButton label="Авторизоваться" onClickFn={() => null} /> */}
      <a href={authUrl}>Auth sportify</a>
    </div>
  )
}
