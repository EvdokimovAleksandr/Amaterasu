import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Tooltip from 'Components/Tooltip/Tooltip'
import QuestionIcon from 'Icons/QuestionIcon'
import CustomButton from 'Components/UI/CustomButton/CustomButton'

import { getListActionYm } from '../../../Redux/Actions/YMActions'

import '../index.scss'

export default function Field({ confirmFn = () => null }) {
  const dispatch = useDispatch()
  const [token, setToken] = useState('')

  const handleRequestList = () => {
    if (token) {
      dispatch(getListActionYm({ token: token }))
    }
  }

  return (
    <div className="auth-ym">
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
        <CustomButton onClickFn={handleRequestList} label={'Поехали'} />
      </div>
    </div>
  )
}
