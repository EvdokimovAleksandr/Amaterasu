import React from 'react'

import './index.scss'

export default function ModalForAuth({ children, open, closeFn }) {
  const handleBackdropClick = (event) => {
    // Закрываем только если клик был на самом бэкдропе
    if (event.target === event.currentTarget) {
      closeFn()
    }
  }

  return (
    open && (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-wrapper">
          <button className="button-exit" onClick={closeFn}>
            X
          </button>
          {children}
        </div>
      </div>
    )
  )
}