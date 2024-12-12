import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Tooltip from 'Components/Tooltip/Tooltip'
import QuestionIcon from 'Icons/QuestionIcon'

import { getListActionYm } from './../../Redux/Actions/YMActions'

import './index.scss'

export default function Field({ confirmFn = () => null }) {
  const dispatch = useDispatch()
  const [token, setToken] = useState('')

  const handleRequestList = () => {
    if (token) {
      dispatch(getListActionYm({ token: token }))
    }
  }

  //   ;<Field
  //     cssName={'input-token'}
  //     value={token}
  //     setValue={setToken}
  //     placeholder={'Введите свой токен я.музыки'}
  //     confirmFn={handleRequestList}
  //   />

  const handleClick = (e) => {
    handleRequestList()
    e.target.classList.add('clicked')

    // Удаляем класс через 2 секунды (время анимации)
    setTimeout(() => {
      e.target.classList.remove('clicked')
    }, 2000)
  }

  return (
    <div className="container-input">
      <div className="wrapper-help">
        <span className="text-for-input">Введите свой токен я.музыки</span>
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
        <input className={`input-token custom-input`} value={token} onChange={(e) => setToken(e.target.value)} />
        <button className="button-input" onClick={handleClick}>
          Поехали
        </button>
      </div>
    </div>
  )
}
