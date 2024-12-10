import React from 'react'

import Tooltip from 'Components/Tooltip/Tooltip'
import QuestionIcon from 'Icons/QuestionIcon'

import './index.scss'

export default function Field({ cssName, value, setValue, placeholder, confirmFn = () => null }) {
  const handleClick = (e) => {
    confirmFn()
    e.target.classList.add('clicked')

    // Удаляем класс через 2 секунды (время анимации)
    setTimeout(() => {
      e.target.classList.remove('clicked')
    }, 2000)
  }

  return (
    <div className="container-input">
      <div className="wrapper-help">
        <span className="text-for-input">{placeholder}</span>
        <div className="help-note">
          <Tooltip
            text="О том как получить токен читайте в"
            link="https://yandex-music.readthedocs.io/en/main/token.html"
            nameLink={'Документации'}
          >
            <QuestionIcon />
          </Tooltip>
        </div>
      </div>
      <div className="wrapper-input">
        <input className={`${cssName} custom-input`} value={value} onChange={(e) => setValue(e.target.value)} />
        <button className="button-input" onClick={handleClick}>
          Поехали
        </button>
      </div>
    </div>
  )
}
