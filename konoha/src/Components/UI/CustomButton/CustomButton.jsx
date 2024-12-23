import React from 'react'

import './index.scss'

export default function CustomButton({ onClickFn = () => null, label = '', disbale = false }) {
  const handleClick = (e) => {
    onClickFn()
    e.target.classList.add('clicked')

    // Удаляем класс через 2 секунды (время анимации)
    setTimeout(() => {
      e.target.classList.remove('clicked')
    }, 2000)
  }

  return (
    <button className="custom-button" onClick={handleClick} disabled={disbale}>
      {label}
    </button>
  )
}
