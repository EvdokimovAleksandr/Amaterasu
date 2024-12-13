import React, { useState } from 'react'

import CustomButton from 'Components/UI/CustomButton/CustomButton'

export default function AuthSpotify() {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev)
  }

  return (
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
      <CustomButton label="Авторизоваться" onClickFn={() => null} />
    </div>
  )
}
