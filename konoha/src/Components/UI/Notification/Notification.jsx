import React, { useState, useEffect } from 'react'
import './index.scss'

export default function Notification({ list, message, status, open, handleClose }) {
  const [visible, setVisible] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!hovered) {
      const timeout = setTimeout(() => handleClose(), 5000)
      return () => clearTimeout(timeout)
    }
  }, [hovered])

  if (!open) return null

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)

  return (
    <div
      className={`notification ${status === 'Success' ? 'notification--success' : 'notification--failed'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button onClick={handleClose} className="notification__close-btn">
        &times;
      </button>
      <p className="notification__message">{message}</p>
      {list.length > 0 && (
        <div className="notification__details">
          <button onClick={() => setExpanded(!expanded)} className="notification__toggle-btn">
            {expanded ? 'Hide Details' : 'Show Details'}
          </button>
          {expanded && (
            <ul className="notification__list">
              {list.map((item, index) => (
                <li key={index} className="notification__list-item">
                  {item.title} - {item.artists}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
