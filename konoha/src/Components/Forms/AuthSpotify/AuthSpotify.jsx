import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CustomButton from 'Components/UI/CustomButton/CustomButton'

import { postTransferToSpotify } from './../../../Redux/Actions/SpotifyActions'
import { startSpotifyAuth } from 'Api/ApiSpotify/AUTH-spotify'

export default function AuthSpotify() {
  const dispatch = useDispatch()
  const [namePlaylist, setNamePlaylist] = useState('')
  const spotifyData = useSelector((state) => state.SpotifyReducer.headersSpotify)
  const tracks = useSelector((state) => state.YMReducer.list)
  const handleAuth = () => {
    startSpotifyAuth()
  }

  const handleTransfer = () => {
    const query = {
      tracks: tracks,
      playlistName: namePlaylist,
      accessToken: spotifyData?.accessToken,
    }
    console.log(tracks, spotifyData, namePlaylist)

    if (tracks.length && spotifyData?.accessToken && namePlaylist) dispatch(postTransferToSpotify(query))
  }

  return (
    <div className="auth-spotify">
      {!spotifyData && (
        <a className="auth-link-spotify" onClick={handleAuth}>
          Авторизация
        </a>
      )}
      <div className="form-wrapper">
        <input
          className="input-auth"
          type="text"
          placeholder="Назови плейлист"
          value={namePlaylist}
          onChange={(e) => setNamePlaylist(e.target.value)}
        />
      </div>
      <CustomButton onClickFn={handleTransfer} label="Перенести в Spotify" disbale={!namePlaylist} />
    </div>
  )
}
