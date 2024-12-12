import AuthSpotify from './AuthSpotify'
import AuthYM from './AuthYM'

export const authForms = {
  spotify: <AuthSpotify />,
  yandex: <AuthYM />,
}

export const changeAuth = (condition) => {
  console.log(condition)

  return authForms[condition]
}
