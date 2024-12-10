import React, { useState } from 'react'

import './index.scss'

const Tooltip = ({ children, text, link, nameLink }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="tooltip-wrapper" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      <div className="icon">{children}</div>
      {isVisible && (
        <div className="tooltip">
          {text}{' '}
          <a href={link} target="_blank" rel="noopener noreferrer">
            {nameLink}
          </a>
        </div>
      )}
    </div>
  )
}

export default Tooltip
