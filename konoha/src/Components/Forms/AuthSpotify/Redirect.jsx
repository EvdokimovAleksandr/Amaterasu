import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect() {
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const authCode = queryParams.get('code')

    if (authCode) {
      // Здесь отправьте authCode на ваш сервер
      fetch('http://localhost:8000/api/get_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth_code: authCode }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Access token response:', data)
          // Сохраните токен или выполните другую логику
          navigate('/')
        })
        .catch((err) => console.error('Error fetching access token:', err))
    } else {
      console.error('Authorization code not found')
    }
  }, [navigate])

  return <div>Processing Spotify authorization...</div>
}
