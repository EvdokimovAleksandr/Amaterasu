import React from 'react'

import './index.scss'

export default function Input({ cssName, value, setValue, placeholder, confirmFn = () => null }) {
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
      <span className="text-for-input">{placeholder}</span>
      <div className="wrapper-input">
        <input
          className={`${cssName} custom-input`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          // placeholder={placeholder}
        />
        <button className="button-input" onClick={handleClick}>
          Поехали
        </button>
      </div>
    </div>
  )
}
