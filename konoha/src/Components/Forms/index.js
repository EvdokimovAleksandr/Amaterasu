import AuthSpotify from './AuthSpotify/AuthSpotify'
import AuthYM from './AuthYM/AuthYM'

export const authForms = {
  spotify: <AuthSpotify />,
  yandex: <AuthYM />,
}

export const changeAuth = (condition) => {
  return authForms[condition]
}
