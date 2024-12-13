import React from 'react'

import './index.scss'

export default function ListTracks({ list = [] }) {
  return (
    <div className="list-wrapper">
      <span className="count-tracks">К переносу подготовлено {list.length} треков</span>

      <div className="list-container">
        {list.map((i) => {
          const { title, artists } = i

          return (
            <div className="track">
              <span className="artist">{artists}</span> - <span className="title">{title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
